const express = require("express");
const { register, login } = require("../contollers/auth");
const refreshAccessToken = require("../contollers/refreshTokenController");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/refresh").get(refreshAccessToken);
module.exports = router;
