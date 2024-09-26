const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const register = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.OK).json({ user });
};
const login = async (req, res) => {
  res.send("login buddy");
};
module.exports = {
  register,
  login,
};
