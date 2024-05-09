const resultModel = require("../modal/Result");
const candidateModel = require("../modal/candidate");
const userModel = require("../modal/user");

async function DeclareResults(req, res) {
  try {
    const userId = req.params.id;

    const userData = await userModel.findById(userId);
    console.log(userData);
    console.log(userId);
    if (!userData) {
      return res.status(404).send({
        message: "only admin can declare results",
        data: null,
        success: false,
      });
    }
    const candidateVotes = await candidateModel.find();
    const votingCounts = [];
    candidateVotes.map((candidate, index) => {
      votingCounts.push({
        candidate: candidate,
        votecount: candidate.voters_id.length,
      });
    });

    if (votingCounts.length > 0) {
      const winner = votingCounts.reduce((prev, current) =>
        prev.votecount > current.votecount ? prev : current 
      );
      console.log(`winner`, winner);
      console.log(`voting counts`, votingCounts);
      const winnerCandidate = {
        ResultDeclared: true,
        winnerCandidate: winner?.candidate._id,
      };
      const winnerData = new resultModel(winnerCandidate);
      const Data = await winnerData.save();
      console.log(`DAtat`, Data);

      return res.status(200).json({
        message: "result Declared successfully",
        data: Data,
        success: true,
      });
    }
    return res.status(404).send({
      message: "something went wrong from 404",
      data: null,
      success: false,
    });

    // const result = await resultModel.find();
  } catch (error) {
    return res.status(404).send({
      message: "something went wrong",
      data: null,
      success: false,
    });
  }
}

module.exports = {
  DeclareResults,
};
