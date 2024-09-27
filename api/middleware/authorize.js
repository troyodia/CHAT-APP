const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError } = require("../errors");
const User = require("../models/User");

const authorize = async (req, res, next) => {
  const user = new User();

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("no token provided");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = user.verifyToken(token);
    const { userId, firstname, lastname, email } = decoded;
    req.user = { userId, firstname, lastname, email };
    next();
  } catch (error) {
    throw new UnauthenticatedError("invalid unthorization");
  }
};
module.exports = authorize;
