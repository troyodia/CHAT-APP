const express = require("express");
const router = express.Router();
const { getMessages, uploadFile } = require("../contollers/messages");
const { fileUpload } = require("../middleware/multer");
router.route("/getMessages").post(getMessages);
router.route("/uploadFile").post(fileUpload.single("file"), uploadFile);

module.exports = router;
