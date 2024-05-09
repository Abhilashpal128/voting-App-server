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

userRouter.post("/", handleUserRegister);
userRouter.post("/login", handleUserLogin);
userRouter.post("/voting/:id", handleUserVote);
userRouter.get("/candidate/:id", handlefetchAllCandidate);

module.exports = userRouter;
