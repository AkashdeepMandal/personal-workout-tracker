const express = require("express");
const auth = require("../middleware/auth");
const authTrainee = require("../middleware/authTrainee");
const Workout = require("../models/workout");
const Plan = require("../models/plan");
const User = require("../models/user");

const router = express.Router();

//Get plans assigned to trainee
// /GET /api/trainer/plan/user/:trainee_id
router.get(
  "/api/trainee/plan/details/:id?",
  [auth, authTrainee],
  async (req, res, next) => {
    try {
      if (req.param.id) {
        const plan = await Plan.findById(req.param.id)
          .populate([{ path: "trainer", select: "firstName lastName" }])
          .populate([{ path: "trainee", select: "firstName lastName" }])
          .populate([
            { path: "workouts.workout", select: "name category calories" },
          ]);
        if (!plan) {
          const errorMsg = new Error("Plans Unavailable");
          errorMsg.status = 404;
          throw errorMsg;
        }
        res.send(plan);
      } else {
        const plans = await Plan.find({ trainee: req.user._id }, null, {
          limit: parseInt(req.query.limit) || 10,
          skip: parseInt(req.query.skip) || 0,
        });
        if (!plan) {
          const errorMsg = new Error("Plans Unavailable");
          errorMsg.status = 404;
          throw errorMsg;
        }
        res.send(plans);
      }
    } catch (error) {
      next(error);
    }
  }
);

// trainee joining date
router.get(
  "/api/trainee/join/date",
  [auth, authTrainee],
  async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      const join = user.createdAt;
      // console.log(new Date().);
      console.log(join.getFullYear(), join.getMonth());
      res.send(
        `${user.dob.getDate()}/${user.dob.getMonth()}/${user.dob.getFullYear()}`
      );
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
