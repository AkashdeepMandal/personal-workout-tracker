const express = require("express");
const auth = require("../middleware/auth");
const authTrainee = require("../middleware/authTrainee");
const Workout = require("../models/workout");
const Plan = require("../models/plan");
const Progress = require("../models/progress");
const User = require("../models/user");

const router = express.Router();

//Get plans assigned to trainee
// /GET /api/trainer/plan/user/:trainee_id
router.get(
  "/api/trainee/assigned/workouts",
  [auth, authTrainee],
  async (req, res, next) => {
    try {
      // if (req.param.id) {
      const plan = await Plan.findOne({ trainee: req.user._id })
        .populate([{ path: "trainee", select: "firstName lastName" }])
        .populate([
          { path: "workouts.workout", select: "name category calories logo" },
        ]);
      if (!plan) {
        const errorMsg = new Error("Plans Unavailable");
        errorMsg.status = 404;
        throw errorMsg;
      }
      res.send(plan);
    } catch (error) {
      next(error);
    }
  }
);

/// get workouts
// /GET /api/admin/workouts/details/workout_id
router.get(
  "/api/trainee/workouts/details/:id",
  [auth, authTrainee],
  async (req, res, next) => {
    try {
      const workout = await Workout.findById(req.params.id);
      res.send(workout);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/api/trainee/workout/save",
  [auth, authTrainee],
  async (req, res, next) => {
    try {
      const date = new Date();
      const today =
        date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
      const trainee = await Progress.findOne({
        trainee: req.user.id,
        createdAt: { $gte: new Date(today) },
      });
      if (trainee) {
        const isWorkoutExist = trainee.workouts.find(
          (workout) => workout.name == req.body.name
        );
        if (isWorkoutExist) {
          res.send({ message: "Workout completed for today" });
          return;
        }

        trainee.workouts = trainee.workouts.concat({
          ...req.body,
        });
        await trainee.save();
        res.send(trainee);
      } else {
        const progress = new Progress({
          trainee: req.user.id,
          workouts: { ...req.body },
        });
        await progress.save();
        res.send(progress);
      }
    } catch (error) {
      error.status = 404;
      next(error);
    }
  }
);

module.exports = router;
