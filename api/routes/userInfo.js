const express = require("express");
const { getSingleUser } = require("../contollers/userInfo");
const router = express.Router();
router.route("/profile").get(getSingleUser);

module.exports = router;
