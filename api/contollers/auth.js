require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const generateToken04 = require("../utils/zegoTokenGenerator.js");

const register = async (req, res) => {
  const user = await User.create({
    ...req.body,
    onlineStatus: true,
  });
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
  console.log(user);
  res.status(StatusCodes.OK).json({ user });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("email does not exist");
  }
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new UnauthenticatedError("password does not exist");
  }
  const onlinestatus = await User.findOneAndUpdate(
    { email },
    { $set: { onlineStatus: true } },
    { new: true }
  ).select("onlineStatus");
  console.log("online status login", onlinestatus);

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
      email: user.email,
      userId: user._id,
    },
    onlinestatus,
    token: req.cookies.ACCESS_TOKEN,
  });
};
const logout = async (req, res) => {
  res.clearCookie("REFRESH_TOKEN");
  res.clearCookie("ACCESS_TOKEN");
  const onlineStatus = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { $set: { onlineStatus: false } },
    { new: true }
  ).select("onlineStatus");
  console.log("online status log out", onlineStatus);
  res.status(StatusCodes.OK).json({ msg: "logged out", onlineStatus });
};
const createProfile = async (req, res) => {
  const { email, firstname, lastname } = req.body;
  const { userId, email: userEmail } = req.user;
  if (!email || !firstname || !lastname) {
    throw new BadRequestError(
      "please provide email, first name and last name."
    );
  }
  if (email != userEmail) {
    throw new BadRequestError("entered email does not match registered email");
  }
  const updateUser = await User.findOneAndUpdate(
    { _id: userId },
    { firstname, lastname, profileSetup: true },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({
    userId: updateUser._id,
    email: updateUser.email,
    firstname: updateUser.firstname,
    lastname: updateUser.lastname,
    image: updateUser.image,
    profileSetup: updateUser.profileSetup,
  });
};
const addProfileImage = async (req, res) => {
  if (!req.file) throw new BadRequestError("image not uploaded");
  const { filename } = req.file;
  const updateUser = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { image: filename },
    { runValidators: true, new: true }
  );
  console.log(req.file);
  res.status(StatusCodes.OK).json({
    userId: updateUser._id,
    email: updateUser.email,
    firstname: updateUser.firstname,
    lastname: updateUser.lastname,
    image: updateUser.image,
    profileSetup: updateUser.profileSetup,
  });
};
const deleteProfileImage = async (req, res) => {
  await User.updateOne({ _id: req.user.userId }, { $unset: { image: 1 } });
  const updatedUser = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json(updatedUser);
};
const generateZegoToken = (req, res) => {
  const appId = parseInt(process.env.ZEGO_APP_ID);
  console.log(appId);
  const serverSecret = process.env.ZEGO_SERVER_SECRET;
  const userId = req.user.userId;
  const payload = "";
  const effectiveTime = 3600;
  if (appId && serverSecret && userId) {
    const token = generateToken04(
      appId,
      userId,
      serverSecret,
      effectiveTime,
      payload
    );
    return res.status(StatusCodes.OK).json({ token });
  } else {
    throw new BadRequestError(
      "zego Token cannot be generated invalid credentials"
    );
  }
};
const getOnlinestatus = async (req, res) => {
  if (!req.body) {
    throw new BadRequestError("cannot set user online or offline");
  }
  const { contactId } = req.body;
  const contactOnlineStatus = await User.findOne({ _id: contactId }).select(
    "onlineStatus"
  );
  console.log(contactOnlineStatus);
  res.status(StatusCodes.OK).json({ contactOnlineStatus });
};
module.exports = {
  register,
  login,
  logout,
  createProfile,
  addProfileImage,
  deleteProfileImage,
  generateZegoToken,
  getOnlinestatus,
};
