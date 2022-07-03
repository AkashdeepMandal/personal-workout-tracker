const mongoose = require("mongoose");
const Plan = require("./plan");

const workoutSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    calories: { type: Number, required: true, trim: true },
    logo: { type: Buffer },
  },
  { timestamps: true }
);

// remove properties from object when converting to json
workoutSchema.methods.toJSON = function () {
  const workout = this;
  const workoutObject = workout.toObject();

  delete workoutObject.__v;

  return workoutObject;
};

// remove workouts in plan and progress
workoutSchema.pre("remove", async function (next) {
  const workout = this;
  await Plan.updateMany(
    { "workouts.workout": workout._id },
    { $pull: { workouts: { workout: workout._id } } },
    { multi: true }
  );
  next();
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
