const express = require("express");
const router = express.Router();
const getMessages = require("../contollers/messages");
router.route("/getMessages").post(getMessages);

module.exports = router;
