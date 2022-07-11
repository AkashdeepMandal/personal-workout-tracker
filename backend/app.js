const express = require("express");
const userRouter = require("./routers/user");
const adminRouter = require("./routers/user-admin");
const trainerRouter = require("./routers/user-trainer");
const traineeRouter = require("./routers/user-trainee");
const cors = require("cors");
require("dotenv").config();

require("./db/mongoose");

const app = express();

app.use(cors());

app.use(express.json());
app.use(userRouter);
app.use(adminRouter);
app.use(trainerRouter);
app.use(traineeRouter);

// Error Handaling
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
