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
candidateRouter.get("/admin/addCandidate", (req, res) => {
  res.send("hello this route is working");
});
candidateRouter.post("/admin/userVote/:id");
candidateRouter.get("/admin/candidate/:id", handlesingleCandidateFetch);
candidateRouter.get(
  "/admin/candidates/:id",

  handleFetchCandidateByAdmin
);
candidateRouter.get("/admin/logout", handleSessiondestroy);

module.exports = candidateRouter;
