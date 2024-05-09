const { mongoose } = require("mongoose");

const candidateschema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    voters_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const candidateModel = mongoose.model("candidate", candidateschema);
module.exports = candidateModel;
