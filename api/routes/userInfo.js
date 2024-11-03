const express = require("express");
const { getSingleUser } = require("../contollers/userInfo");
const authorize = require("../middleware/authorize");
const router = express.Router();
router.route("/getSingleUser").get(authorize, getSingleUser);

module.exports = router;
