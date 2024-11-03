const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const User = require("../models/User");

const getSingleUser = async (req, res) => {
  const { user } = req;
  if (!user) {
    throw BadRequestError("User does not exist");
  }
  const singleUser = await User.findById({ _id: user.userId });
  res.status(StatusCodes.OK).json({ singleUser });
};
module.exports = {
  getSingleUser,
};
