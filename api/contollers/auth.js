require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const fs = require("fs");

const register = async (req, res) => {
  console.log(req.cookies.image);

  if (!req.cookies.image) throw new BadRequestError("no image file");
  const image = JSON.parse(req.cookies.image);
  const { path, originalname: filename, mimetype: contentType } = image;

  const bitmap = fs.readFileSync(path);
  const imageBase64 = bitmap.toString("base64");

  const user = await User.create({
    ...req.body,
    filename,
    contentType,
    imageBase64,
  });
  console.log(user);
  res.status(StatusCodes.OK).json({ user });
};

const getImage = async (req, res) => {
  if (!req.file) throw new BadRequestError("no file");
  console.log(req.file);
  res.cookie("image", JSON.stringify(req.file), {
    secure: false,
    sameSite: "none",
  });
  res.status(StatusCodes.OK).json(req.file);
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
  getImage,
};
