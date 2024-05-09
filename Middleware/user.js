const userModel = require("../modal/user");

async function handleUserSession(req, res, next) {
  console.log(`req.session.username`, req.session.email);
  console.log(`req.params.id`, req.params.id);

  try {
    const UserData = await userModel.findOne({ _id: req?.params?.id });
    if (!UserData) {
      return res
        .status(403)
        .json({ message: "your session expired", data: null, error: error });
    }

    if (UserData?.email == req?.session?.email) {
      console.log("all passeddd");
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Your session expired", data: null, success: false });
    }
  } catch (error) {
    return res
      .status(403)
      .json({ message: "your session expired", data: null, error: error });
  }
}

module.exports = { handleUserSession };
