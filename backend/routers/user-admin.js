const express = require("express");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const User = require("../models/user");
const Workout = require("../models/workout");
const mutler = require("multer");
const sharp = require("sharp");

const router = express.Router();

// admin Routes
// Create new user
router.post(
  "/api/admin/user/create",
  [auth, authAdmin],
  async (req, res, next) => {
    try {
      const countEmail = await User.countDocuments({ email: req.body.email });
      if (countEmail) {
        const errorMsg = new Error("User already exist with this email");
        errorMsg.status = 401;
        throw errorMsg;
      }
      const newUser = new User(req.body);
      const user = await newUser.save();
      const authToken = [];
      res.status(201).send({ user, authToken });
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

// Get users
// /GET /api/admin/users/details/62bc60f8da2d4e0cc50e75bb
// /GET /api/admin/users/details?filter=trainee&limit=2&skip=0&search=5
router.get(
  "/api/admin/users/details/:id?",
  [auth, authAdmin],
  async (req, res, next) => {
    try {
      if (req.params.id) {
        const user = await User.findById(req.params.id);
        res.send(user);
      } else {
        const totalUsers = await User.countDocuments({
          $and: [
            { role: { $regex: req.query.filter || "" } },
            {
              $or: [
                { firstName: { $regex: req.query.search || "" } },
                { lastName: { $regex: req.query.search || "" } },
                { email: { $regex: req.query.search || "" } },
              ],
            },
          ],
        });
        const users = await User.find(
          {
            $and: [
              { role: { $regex: req.query.filter || "" } },
              {
                $or: [
                  { firstName: { $regex: req.query.search || "" } },
                  { lastName: { $regex: req.query.search || "" } },
                  { email: { $regex: req.query.search || "" } },
                ],
              },
            ],
          },
          null,
          {
            limit: parseInt(req.query.limit) || 10,
            skip: parseInt(req.query.skip) * 10 || 0,
          }
        );
        res.send({ users, totalUsers });
      }
    } catch (error) {
      next(error);
    }
  }
);

// Edit User
router.patch(
  "/api/admin/user/edit/:id",
  [auth, authAdmin],
  async (req, res, next) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "role",
      "firstName",
      "lastName",
      "dob",
      "contactNumber",
      "gender",
      "email",
      "address",
      "password",
    ];
    const isValidOptions = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOptions) {
      const newError = new Error("Invalid updates!");
      newError.status = 400;
      next(newError);
    }
    try {
      const user = await User.findById(req.params.id);
      if (!user) throw new Error("Invalid User");
      updates.forEach((update) => (user[update] = req.body[update]));
      await user.save();

      res.send(user);
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

// delete user
router.delete(
  "/api/admin/user/delete/:id",
  [auth, authAdmin],
  async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        const errorMsg = new Error("User does not exist");
        errorMsg.status = 404;
        throw errorMsg;
      }
      await user.remove();
      res.send(user);
    } catch (error) {
      next(error);
    }
  }
);

// create new workout
router.post(
  "/api/admin/workout/create",
  [auth, authAdmin],
  async (req, res, next) => {
    const newWorkout = new Workout({ ...req.body, createdBy: req.user._id });
    try {
      const workout = await newWorkout.save();
      res.status(201).send(workout);
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

// get workouts
// /GET /api/admin/workouts/details/workout_id
// /GET /api/admin/workouts/details?filter=cardio&limit=2&skip=0&search=5
router.get(
  "/api/admin/workouts/details/:id?",
  [auth, authAdmin],
  async (req, res, next) => {
    try {
      if (req.params.id) {
        const workout = await Workout.findById(req.params.id);
        res.send(workout);
      } else {
        const totalWorkouts = await Workout.countDocuments({
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
            skip: parseInt(req.query.skip) * 10 || 0,
          }
        );
        res.send({ workouts, totalWorkouts });
      }
    } catch (error) {
      next(error);
    }
  }
);

// Edit Workouts
// /PATCH /api/admin/workout/edit/workout_id
router.patch(
  "/api/admin/workout/edit/:id",
  [auth, authAdmin],
  async (req, res, next) => {
    try {
      const workout = await Workout.findByIdAndUpdate(req.params.id, req.body);
      if (!workout) {
        const errorMsg = new Error("Workout Does not Exist");
        errorMsg.status = 404;
        throw errorMsg;
      }
      res.send();
    } catch (error) {
      next(error);
    }
  }
);

// delete Workout
// /DELETE /api/admin/workout/delete/workout_id
router.delete(
  "/api/admin/workout/delete/:id",
  [auth, authAdmin],
  async (req, res, next) => {
    try {
      const workout = await Workout.findById(req.params.id);
      if (!workout) {
        const errorMsg = new Error("Workout Does not Exist");
        errorMsg.status = 404;
        throw errorMsg;
      }
      await workout.remove();
      res.send(workout);
    } catch (error) {
      next(error);
    }
  }
);

// user avatar
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
  "/api/admin/user/avatar/upload/:id",
  [auth, authAdmin],
  avatar.single("avatar"),
  async (req, res) => {
    const user = await User.findById(req.params.id);
    const imgBuffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    user.avatar = imgBuffer;
    await user.save();
    res.send(user);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// Workout logo
const logo = mutler({
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)/)) {
      return callback(new Error("Please uplode jpg/jpeg/png"));
    }
    callback(undefined, true);
  },
});

router.post(
  "/api/admin/workout/logo/upload/:id",
  [auth, authAdmin],
  logo.single("logo"),
  async (req, res) => {
    const workout = await Workout.findById(req.params.id);
    const imgBuffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    workout.logo = imgBuffer;
    await workout.save();
    res.send(workout);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
