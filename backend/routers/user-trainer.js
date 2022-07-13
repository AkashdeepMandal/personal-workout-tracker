const express = require("express");
const auth = require("../middleware/auth");
const authTrainer = require("../middleware/authTrainer");
const User = require("../models/user");
const Workout = require("../models/workout");
const Plan = require("../models/plan");

const router = express.Router();

// Get users
// /GET /api/users/details/62bc60f8da2d4e0cc50e75bb
// /GET /api/users/details?limit=2&skip=0&search=5
router.get(
  "/api/trainer/users/details/:id?",
  [auth, authTrainer],
  async (req, res, next) => {
    try {
      if (req.params.id) {
        const user = await User.findOne({
          _id: req.params.id,
          role: "trainee",
        });
        res.send(user);
      } else {
        const totalUsers = await User.countDocuments({
          $and: [
            { role: "trainee" },
            {
              $or: [
                { firstName: { $regex: req.query.search || "" } },
                { lastName: { $regex: req.query.search || "" } },
              ],
            },
          ],
        });
        const users = await User.find(
          {
            $and: [
              { role: "trainee" },
              {
                $or: [
                  { firstName: { $regex: req.query.search || "" } },
                  { lastName: { $regex: req.query.search || "" } },
                ],
              },
            ],
          },
          null,
          {
            limit: parseInt(req.query.limit) || 10,
            skip: parseInt(req.query.skip) || 0,
          }
        );
        res.send({ users, totalUsers });
      }
    } catch (error) {
      next(error);
    }
  }
);

// Count trainees
router.get(
  "/api/trainer/count/trainees",
  [auth, authTrainer],
  async (req, res, next) => {
    try {
      const countTrainees = await User.countDocuments({ role: "trainee" });
      res.send({ countTrainees });
    } catch (error) {
      next(error);
    }
  }
);

// get workouts
// /GET /api/trainer/workouts/details/62bc60f8da2d4e0cc50e75bb
// /GET /api/trainer/workouts/details?filter=cardio&limit=2&skip=0&search=5
router.get(
  "/api/trainer/workouts/details/:id?",
  [auth, authTrainer],
  async (req, res, next) => {
    try {
      if (req.params.id) {
        const workout = await Workout.findById(req.params.id);
        res.send(workout);
      } else {
        const totalWorkouts = await User.countDocuments({
          $and: [
            { category: { $regex: req.query.filter || "" } },
            {
              $or: [{ name: { $regex: req.query.search || "" } }],
            },
          ],
        });
        const workouts = await Workout.find(
          {
            $and: [
              { category: { $regex: req.query.filter || "" } },
              {
                $or: [{ name: { $regex: req.query.search || "" } }],
              },
            ],
          },
          null,
          {
            limit: parseInt(req.query.limit) || 10,
            skip: parseInt(req.query.skip) || 0,
          }
        );
        res.send({ workouts, totalWorkouts });
      }
    } catch (error) {
      next(error);
    }
  }
);

// create / modify plan for user
router.post(
  "/api/trainer/workout/assign/:id",
  [auth, authTrainer],
  async (req, res, next) => {
    try {
      const user = await User.findOne({ role: "trainee", _id: req.params.id });
      if (!user) {
        const error = new Error("Invalid User");
        error.status = 404;
        throw error;
      }
      const plan = await Plan.findOne({ trainee: user._id });
      if (plan) {
        plan.workouts = req.body;
        await plan.save();
      } else {
        const newPlan = new Plan({
          ...req.body,
          trainee: req.params.id,
        });
        await newPlan.save();
      }
      res.status(201).send();
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

// Count Workous
router.get(
  "/api/trainer/count/workouts",
  [auth, authTrainer],
  async (req, res, next) => {
    try {
      const countWorkouts = await Workout.countDocuments();
      res.send({ countWorkouts });
    } catch (error) {
      next(error);
    }
  }
);

// get plans of treinee assigned by trainer
// /GET /api/trainer/plan/user/:trainee_id  auth:trainer._id
router.get(
  "/api/trainer/assigned/workouts/:id",
  [auth, authTrainer],
  async (req, res, next) => {
    if (!req.params.id) {
      const newError = new Error("Invalid Request");
      newError.status = 400;
      throw newError;
    }

    try {
      const plan = await Plan.find({
        trainee: req.params.id,
      })
        .populate([{ path: "trainee", select: "firstName lastName" }])
        .populate([
          { path: "workouts.workout", select: "name logo category calories" },
        ]);
      if (!plan) {
        const newError = new Error("Plan not found");
        newError.status = 404;
        throw newError;
      }
      res.status(200).send(plan);
    } catch (error) {
      next(error);
    }
  }
);

// delete plans of trainee assigned by trainer
// /DELETE /api/trainer/plan/delete/trainee_id
router.delete(
  "/api/trainer/remove/workout/:id",
  [auth, authTrainer],
  async (req, res, next) => {
    try {
      const plan = await Plan.find({ trainee: req.params.id });
      plan[0].workouts = plan[0].workouts.filter((value) => {
        return value.workout != req.body.workout;
      });
      await plan[0].save();
      res.send(plan);
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

module.exports = router;
