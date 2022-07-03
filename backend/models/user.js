const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Workout = require("./workout");
const Plan = require("./plan");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      requried: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Invalid Email.");
      },
    },
    contactNumber: {
      type: Number,
      require: true,
      trim: true,
    },
    address: {
      type: String,
      require: true,
      Trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password"))
          throw new Error("Password can not be set as password.");
        if (!validator.isLength(value, { min: 6 }))
          throw new Error("Password must have atleast 6 charactor");
      },
    },
    tokens: [
      {
        token: { type: String, required: true },
      },
    ],
    profileImg: { type: Buffer },
  },
  { timestamps: true }
);

// instance functions
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id.toString(), role: user.role.toString() },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// remove properties from object when converting to json
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.__v;
  delete userObject.profileImg;

  return userObject;
};

userSchema.statics.findUserByCredential = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found.");
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) throw new Error("Unable to login");
  return user;
};

// while saving the password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// remove based on user role
userSchema.pre("remove", async function (next) {
  const user = this;
  if (user.role === "trainer") {
    await Plan.deleteMany({ trainer: user._id });
  } else if (user.role === "trainee") {
    await Plan.deleteMany({ trainee: user._id });
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
