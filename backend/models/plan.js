const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    workouts: [
      { workout: { type: mongoose.Schema.Types.ObjectId, ref: "Workout" } },
    ],
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    trainee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

// remove properties from object when converting to json
planSchema.methods.toJSON = function () {
  const plan = this;
  const planObject = plan.toObject();

  delete planObject.__v;

  return planObject;
};

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
