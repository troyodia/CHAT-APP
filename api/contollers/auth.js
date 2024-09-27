const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError } = require("../errors");
const register = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.OK).json({ user });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide email and password");
  }
  const user = await User.findOne({ email });
  res.status(StatusCodes.OK).json({ user });
};
module.exports = {
  register,
  login,
};
