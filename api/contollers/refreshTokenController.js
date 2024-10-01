//create refresh token controller with new refresh route, if the refresh is in req.cookies, verfiy the refresh token and create a new access token
//test the refresh route to see if a new access token is constantly generated
//front end create a func to get new access token from the refresh route (make it get route)

const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

//research axios interception handler for access token refrshes
const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.REFRESH_TOKEN;
  if (!refreshToken) {
    throw new UnauthenticatedError("Refresh token not generated");
  }
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
  if (decoded) {
    const accessToken = jwt.sign(
      {
        userId: decoded.userId,
        firstname: decoded.firstname,
        lastname: decoded.lastname,
        email: decoded.email,
      },
      process.env.ACCESS_SECRET,
      { expiresIn: process.env.ACCESS_LIFETIME }
    );
    res.cookie("ACCESS_TOKEN", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });
    res.status(StatusCodes.OK).json(accessToken);
  }
};
module.exports = refreshAccessToken;
