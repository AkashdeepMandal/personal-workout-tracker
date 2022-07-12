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
        name: { type: String },
        duration: { type: String },
        totalCalories: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

const Progress = mongoose.model("Progress", progressSchema);
module.exports = Progress;
