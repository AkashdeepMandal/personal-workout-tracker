const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/user");
const mutler = require("multer");
const sharp = require("sharp");

const router = express.Router();

// General User routes
// Create new user
router.post("/api/user/create", async (req, res, next) => {
  try {
    const checkUser = await User.findOne({ email: req.body.email });
    if (checkUser) {
      const errorMsg = new Error("Already have an account");
      errorMsg.status = 400;
      throw errorMsg;
    }
    const newUser = new User({ ...req.body, role: "trainee" });
    const user = await newUser.save();
    const authToken = await newUser.generateAuthToken();
    res.status(201).send({ user, authToken });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

// login users
router.post("/api/user/login", async (req, res, next) => {
  try {
    const user = await User.findUserByCredential(
      req.body.email,
      req.body.password
    );
    const authToken = await user.generateAuthToken();
    res.send({ user, authToken });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

// get details
router.get("/api/user/details", auth, async (req, res, next) => {
  try {
    const userObject = req.user.toObject();
    delete userObject.avatar;
    delete userObject.tokens;
    delete userObject.password;
    delete userObject.__v;

    res.send(userObject);
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

// update user details
router.patch("/api/user/edit", auth, async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "firstName",
    "lastName",
    "dob",
    "contactNumber",
    "address",
    "password",
  ];
  const isValidOptions = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOptions) throw new Error("Invalid updates!");
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send(req.user);
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

// logout Users
router.post("/api/user/logout", auth, async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send({ message: "logout successful" });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

const avatar = mutler({
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)/)) {
      return callback(new Error("Please uplode jpg/jpeg/png"));
    }
    callback(undefined, true);
  },
});
router.post(
  "/api/user/avatar/upload",
  auth,
  avatar.single("avatar"),
  async (req, res) => {
    const imgBuffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = imgBuffer;
    await req.user.save();
    res.send(req.user);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// Delete avater from user
router.delete("/user/me/avater", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

// get user avater
router.get("/api/user/:id/avater", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(400).send({ error });
  }
});
module.exports = router;
