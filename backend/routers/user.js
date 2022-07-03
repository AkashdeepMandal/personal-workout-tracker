const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/user");

const router = express.Router();

// General User routes
// Create new user
router.post("/api/user/create", async (req, res, next) => {
  try {
    const newUser = new User({ ...req.body, role: "trainee" });
    const user = await newUser.save();
    const authToken = await newUser.generateAuthToken();
    res.status(201).send({ user, authToken });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

// login users
router.post("/api/user/login", async (req, res, next) => {
  try {
    const user = await User.findUserByCredential(
      req.body.email,
      req.body.password
    );
    const authToken = await user.generateAuthToken();
    res.send({ user, authToken });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

// get details
router.get("/api/user/details", auth, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

// update user details
router.patch("/api/user/edit", auth, async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "firstName",
    "lastName",
    "dob",
    "contactNumber",
    "address",
    "password",
  ];
  const isValidOptions = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOptions) throw new Error("Invalid updates!");
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send(req.user);
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

// logout Users
router.post("/api/user/logout", auth, async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send({ message: "logout successful" });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

module.exports = router;
