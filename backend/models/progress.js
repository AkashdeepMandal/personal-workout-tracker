const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    trainee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    workouts: [
      {
        Workout: { type: mongoose.Schema.Types.ObjectId, ref: "Workout" },
        duration: { type: Number },
        totalCalories: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

const Progress = mongoose.model("Progress", progressSchema);
module.exports = Progress;
