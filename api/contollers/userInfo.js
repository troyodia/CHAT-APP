const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const getSingleUser = async (req, res) => {
  const { user } = req;
  if (!user) {
    throw BadRequestError("User does not exist");
  }
  res.status(StatusCodes.OK).json({ user });
};
module.exports = {
  getSingleUser,
};
