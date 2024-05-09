const express = require("express");

const { DeclareResults } = require("../controller/Result");

const resultRouter = express.Router();

resultRouter.post("/result/declare/:id", DeclareResults);

module.exports = resultRouter;
