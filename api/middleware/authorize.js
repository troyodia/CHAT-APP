const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError } = require("../errors");
const User = require("../models/User");

const authorize = async (req, res, next) => {
  const user = new User();
  const token = req.cookies.ACCESS_TOKEN;
  if (!token) {
    throw new UnauthenticatedError("no token provided");
  }
  // const authHeader = req.headers.authorization;

  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   throw new UnauthenticatedError("no token provided");
  // }

  // const token = authHeader.split(" ")[1];
  try {
    const decoded = user.verifyToken(token, process.env.ACCESS_SECRET);
    const { userId, firstname, lastname, email } = decoded;
    // console.log(userId, firstname, lastname, email);
    req.user = { userId, firstname, lastname, email };
    next();
  } catch (error) {
    throw new UnauthenticatedError("invalid unthorization");
  }
};
module.exports = authorize;
