const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const getSingleUser = async (req, res) => {
  if (!req.user) {
    throw BadRequestError("User does not exist");
  }
  res.status(StatusCodes.OK).json(req.user);
};
module.exports = {
  getSingleUser,
};
