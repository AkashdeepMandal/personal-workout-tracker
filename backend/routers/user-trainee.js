const express = require("express");
const auth = require("../middleware/auth");
const authTrainee = require("../middleware/authTrainee");
const Workout = require("../models/workout");
const Plan = require("../models/plan");
const Progress = require("../models/progress");
const User = require("../models/user");
const moment = require("moment");

const router = express.Router();

//Get plans assigned to trainee
// /GET /api/trainee/assigned/workouts
router.get(
  "/api/trainee/assigned/workouts",
  [auth, authTrainee],
  async (req, res, next) => {
    try {
      const plan = await Plan.findOne({ trainee: req.user._id })
        .populate([{ path: "trainee", select: "firstName lastName" }])
        .populate([
          { path: "workouts.workout", select: "name category calories logo" },
        ])
        .lean();

      const today = moment().startOf("day");
      const trainee = await Progress.findOne({
        trainee: req.user.id,
        createdAt: {
          $gte: today.toDate(),
          // $lte: moment(today).endOf("day").toDate(),
        },
      });
      if (trainee) {
        plan.workouts = plan.workouts.map((value) => {
          const isWorkoutExist = trainee.workouts.find((completedWorkout) => {
            return completedWorkout.name === value.workout.name;
          });
          return {
            ...value,
            status: isWorkoutExist ? "completed" : "pending",
          };
        });
      } else if (!plan) {
        const errorMsg = new Error("Plans Unavailable");
        errorMsg.status = 404;
        throw errorMsg;
      } else {
        plan.workouts = plan.workouts.map((value) => ({
          ...value,
          status: "pending",
        }));
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

// save workout progress
router.post(
  "/api/trainee/workout/save",
  [auth, authTrainee],
  async (req, res, next) => {
    try {
      const today = moment().startOf("day");
      const trainee = await Progress.findOne({
        trainee: req.user.id,
        createdAt: {
          $gte: today.toDate(),
          // $lte: moment(today).endOf("day").toDate(),
        },
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

// check workout is done
router.get(
  "/api/trainee/check/progress",
  [auth, authTrainee],
  async (req, res, next) => {
    try {
      const today = moment().startOf("day");
      const trainee = await Progress.findOne({
        trainee: req.user.id,
        createdAt: {
          $gte: today.toDate(),
          $lte: moment(today).endOf("day").toDate(),
        },
      });
      if (trainee) res.send(trainee?.workouts);
      res.send([]);
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

// trainee workout history
router.get(
  "/api/trainee/workout/history",
  [auth, authTrainee],
  async (req, res, next) => {
    try {
      const progress = await Progress.find({ trainee: req.user.id })
        .sort({
          _id: -1,
        })
        .limit(6)
        .lean();
      if (progress) {
        const progressHistory = progress.map((progress) => {
          const totalCalories = progress.workouts.reduce((total, workout) => {
            return workout.totalCalories + total;
          }, 0);
          return { ...progress, totalCaloriesBurned: totalCalories };
        });
        res.send(progressHistory);
      }
      res.send([]);
    } catch (error) {
      next.status = 400;
      next(error);
    }
  }
);

// monthly Report
router.get(
  "/api/trainee/report/monthly",
  [auth, authTrainee],
  async (req, res, next) => {
    try {
      const monthlyProgress = { labels: [], data: [] };

      const currentYear = moment().format("yyyy");

      for (let month = 1; month <= 12; month++) {
        // first day of a month
        const startOfMonth = moment(`${currentYear}-${month}`).startOf("month");
        // .format("YYYY-MM-DD");
        // last day of a month
        const endOfMonth = moment(`${currentYear}-${month}`).endOf("month");
        // .format("YYYY-MM-DD");
        // list of months
        monthlyProgress.labels.push(
          moment(`${currentYear}-${month}`).format("MMMM").toString()
        );

        const progress = await Progress.find({
          trainee: req.user.id,
          createdAt: {
            $gte: startOfMonth.toDate(),
            $lte: endOfMonth.toDate(),
          },
        });

        if (progress.length <= 0) {
          monthlyProgress.data.push(0);
        } else {
          const progressHistory = progress.map((progress) => {
            const totalCalories = progress.workouts.reduce((total, workout) => {
              return workout.totalCalories + total;
            }, 0);
            return totalCalories;
          });
          const sum = progressHistory.reduce((a, b) => a + b, 0);
          const avg = sum / progressHistory.length || 0;
          monthlyProgress.data.push(avg);
        }
      }
      res.send({ monthlyProgress });
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

module.exports = router;
