const express = require("express");
const {
  createContactList,
  getContactList,
} = require("../contollers/contactList");
const router = express.Router();
router.route("/createContactList").post(createContactList);
router.route("/getContactList").get(getContactList);

module.exports = router;
