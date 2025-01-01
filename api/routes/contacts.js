const express = require("express");
const {
  searchContact,
  blockContact,
  unBlockContact,
} = require("../contollers/contacts");
const router = express.Router();
router.route("/searchContact").post(searchContact);
router.route("/blockContact").post(blockContact);
router.route("/unblockContact").post(unBlockContact);

module.exports = router;
