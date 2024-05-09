const express = require("express");

const candidateRouter = express.Router();

const {
  handleAddCandidate,
  handleFetchCandidateByAdmin,
  handleSessiondestroy,
  handlesingleCandidateFetch,
} = require("../controller/candidate");
const { handleUserSession } = require("../Middleware/user");

candidateRouter.post("/admin/addCandidate", handleAddCandidate);
candidateRouter.post("/admin/userVote/:id");
candidateRouter.get("/admin/candidate/:id", handlesingleCandidateFetch);
candidateRouter.get(
  "/admin/candidates/:id",

  handleFetchCandidateByAdmin
);
candidateRouter.get("/admin/logout", handleSessiondestroy);

module.exports = candidateRouter;
