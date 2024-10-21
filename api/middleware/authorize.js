const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError } = require("../errors");
const User = require("../models/User");

const authorize = async (req, res, next) => {
  const user = new User();
  const token = req.cookies.ACCESS_TOKEN;
  if (!token) {
    throw new UnauthenticatedError("no token provided");
  }
  try {
    const decoded = user.verifyToken(token, process.env.ACCESS_SECRET);
    const { userId, email } = decoded;
    req.user = { userId, email };
    next();
  } catch (error) {
    throw new UnauthenticatedError("invalid unthorization");
  }
};
module.exports = authorize;
