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

// remove properties from object when converting to json
progressSchema.methods.toJSON = function () {
  const progress = this;
  const progressObject = progress.toObject();

  delete progressObject.__v;

  return progressObject;
};

const Progress = mongoose.model("Progress", progressSchema);
module.exports = Progress;
