const express = require("express");

const userRouter = express.Router();
const {
  handleGetRoute,
  handleUserRegister,
  handleUserLogin,
  handlefetchAllCandidate,
  handleUserVote,
} = require("../controller/user");
const { handleUserSession } = require("../Middleware/user");

userRouter.get("/", handleGetRoute);

userRouter.post("/users/", handleUserRegister);
userRouter.post("/users/login", handleUserLogin);
userRouter.post("/users/voting/:id", handleUserVote);
userRouter.get("/users/candidate/:id", handlefetchAllCandidate);

module.exports = userRouter;
