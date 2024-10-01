require("dotenv").config();
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

  const accessToken = user.generateToken(
    process.env.ACCESS_SECRET,
    process.env.ACCESS_LIFETIME
  );
  const refreshToken = user.generateToken(
    process.env.REFRESH_SECRET,
    process.env.REFRESH_LIFETIME
  );
  res.cookie("ACCESS_TOKEN", accessToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "none",
  });
  res.cookie("REFRESH_TOKEN", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "none",
  });
  res.status(StatusCodes.OK).json({
    user: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      userId: user._id,
    },
  });
};

module.exports = {
  register,
  login,
};
