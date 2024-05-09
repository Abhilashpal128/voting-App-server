const candidateModel = require("../modal/candidate");
const userModel = require("../modal/user");

async function handleAddCandidate(req, res) {
  const { name, username } = req.body;
  console.log(`name`, name);
  console.log(`username`, username);
  const userData = await userModel.findOne({ username });
  console.log(userData);
  if (userData?.isAdmin == true) {
    const newCandidate = await new candidateModel({ name });
    const response = await newCandidate.save();
    return res.status(200).json({
      message: "candidate added successfully",
      data: response,
      success: true,
    });
  }
  return res.status(403).json({
    message: "only admin can add candidates",
    data: null,
    success: false,
  });
}

async function handleFetchCandidateByAdmin(req, res) {
  // const candidateData = await candidateModel.find();

  const AllData = await candidateModel.find().populate("voters_id");
  console.log(`AllDattatatatata`, AllData);
  return res
    .status(200)
    .json({ message: "candidate fetched successfully", data: AllData });
}

async function handlesingleCandidateFetch(req, res) {
  const id = req.params.id;
  try {
    const candidateData = await candidateModel
      .findById({ _id: id })
      .populate("voters_id");
    if (!candidateData) {
      return res
        .status(403)
        .send({ message: "something went wrong", data: null, success: false });
    }
    return res.status(200).json({
      message: "data fetched successfully",
      data: candidateData,
      success: true,
    });
  } catch (error) {
    return res.status(403).json({
      message: "only admin can add candidates",
      data: null,
      success: false,
    });
  }

  console.log(id);
}

async function handleSessiondestroy(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({
        message: "Error destroying session",
        data: null,
        success: false,
      });
    }
    console.log("destroyed session");
    return res.status(201).json({
      message: "session destroyed successfully",
      data: null,
      success: true,
    });
  });
}

module.exports = {
  handleAddCandidate,
  handleFetchCandidateByAdmin,
  handleSessiondestroy,
  handlesingleCandidateFetch,
};
