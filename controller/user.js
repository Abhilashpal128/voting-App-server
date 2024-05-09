const candidateModel = require("../modal/candidate");
const userModel = require("../modal/user");
const bcrypt = require("bcryptjs");
async function handleGetRoute(req, res) {
  return res.send("hello! server is running ");
}

async function handleUserRegister(req, res) {
  try {
    const { username, password, email, contact } = req.body;
    if (!username || !password || !email || !contact) {
      return res.status(400).json({
        message: "please fill All The details",
        data: null,
        success: false,
      });
    }
    const validateNumber = userModel.findOne({ contact });
    if (validateNumber?.contact == contact) {
      return res.status(401).json({
        message: "This contact Number is Already Exists",
        data: null,
        success: false,
      });
    }
    const UserExists = await userModel.findOne({ email });
    console.log(UserExists);
    if (!UserExists) {
      const UserData = await new userModel(req.body);
      const response = await UserData.save();
      req.session.email = email;
      return res.status(200).json({
        message: "User Registered successfully",
        data: response,
        success: true,
      });
    }

    return res.status(401).json({
      message: "User Already Registered",
      data: null,
      success: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong", data: null, success: false });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(401)
      .json({ message: "all fields required", data: null, success: false });
  }
  const userExists = await userModel.findOne({ email });
  if (!userExists) {
    return res.status(403).json({
      message: "Invalid Credentials user not exists",
      data: null,
      success: false,
    });
  }
  const isMatched = await bcrypt.compare(password, userExists.password);
  console.log(isMatched);

  if (isMatched) {
    req.session.email = email;
    userExists.password = null;
    return res.status(200).json({
      message: "user logged in successfully",
      data: userExists,
      success: true,
    });
  }
  return res
    .status(403)
    .json({ message: "Invalid Credentials", data: null, success: false });
}

async function handlefetchAllCandidate(req, res) {
  const allCandidates = await candidateModel.find().select("-voter_id");
  console.log(allCandidates);

  return res.status(200).json({
    message: "Candidate for user",
    data: allCandidates,
    success: true,
  });
  // const candidateforUser=allCandidates.
}

async function handleUserVote(req, res) {
  const candidate_id = req.params.id;
  const { id } = req.body;

  try {
    console.log(`candidate_id`, candidate_id);
    console.log(id);
    const CandidateData = await candidateModel.findById({
      _id: candidate_id,
    });
    const userData = await userModel.findById({ _id: id });

    if (!CandidateData || !userData) {
      return res.status(404).json({
        message: "some thing went wrong",
        data: null,
        success: false,
      });
    }
    userData.vote = candidate_id;
    await userData.save();
    CandidateData.voters_id.push(id);
    await CandidateData.save();
    userData.password = undefined;

    return res
      .status(200)
      .json({ message: "voting successfull", data: userData, success: true });
  } catch (error) {
    return res.status(500).json({
      message: "some thing went wrong",
      data: null,
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  handleGetRoute,
  handleUserRegister,
  handleUserLogin,
  handlefetchAllCandidate,
  handleUserVote,
};
