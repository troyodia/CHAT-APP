const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

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
      sameSite: "none",
    });
    res.status(StatusCodes.OK).json({ mg: "token refreshed" });
  }
};
module.exports = refreshAccessToken;
