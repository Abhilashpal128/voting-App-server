const express = require("express");

const candidateRouter = express.Router();

const {
  handleAddCandidate,
  handleFetchCandidateByAdmin,
  handleSessiondestroy,
  handlesingleCandidateFetch,
} = require("../controller/candidate");
const { handleUserSession } = require("../Middleware/user");

candidateRouter.post("/addCandidate", handleAddCandidate);
candidateRouter.post("/userVote/:id");
candidateRouter.get("/candidate/:id", handlesingleCandidateFetch);
candidateRouter.get(
  "/candidates/:id",

  handleFetchCandidateByAdmin
);
candidateRouter.get("/logout", handleSessiondestroy);

module.exports = candidateRouter;
