const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");
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
    throw new UnauthenticatedError("user email does not exist");
  }
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new UnauthenticatedError("user password does not exist");
  }

  const token = user.generateToken();

  res.status(StatusCodes.OK).json({
    user: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    },
    token,
  });
};

module.exports = {
  register,
  login,
};
