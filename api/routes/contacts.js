const express = require("express");
const {
  searchContact,
  blockContact,
  unBlockContact,
  checkifBlocked,
  getBlockedContacts,
} = require("../contollers/contacts");
const router = express.Router();
router.route("/searchContact").post(searchContact);
router.route("/blockContact").post(blockContact);
router.route("/unblockContact").post(unBlockContact);
router.route("/checkifBlocked").post(checkifBlocked);
router.route("/getBlockedContacts").get(getBlockedContacts);
module.exports = router;
