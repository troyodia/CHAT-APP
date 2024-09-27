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

  if (!user) {
    throw new BadRequestError("user email does not exist");
  }
  if (!(await user.comparePassword(password))) {
    throw new BadRequestError("user password does not exist");
  }
  const token = user.generateToken();

  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, email: user.email }, token });
};
module.exports = {
  register,
  login,
};
