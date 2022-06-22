const express = require("express");
const userRouter = require("./routers/user");
const cors = require("cors");
require("dotenv").config();

require("./db/mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);

module.exports = app;
