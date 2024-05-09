const { mongoose } = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    ResultDeclared: {
      type: Boolean,
      default: false,
    },
    winnerCandidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "candidate",
      default: null,
    },
  },
  { timestamps: true }
);

const resultModel = mongoose.model("resultModel", resultSchema);
module.exports = resultModel;
