const express = require("express");
const searchContact = require("../contollers/contacts");
const router = express.Router();

router.route("/searchContact").post(searchContact);

module.exports = router;
