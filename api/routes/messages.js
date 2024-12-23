const express = require("express");
const router = express.Router();
const {
  getMessages,
  uploadFile,
  getUnreadMessages,
  updatedMessageReadStatus,
} = require("../contollers/messages");
const { fileUpload, audioFileUpload } = require("../middleware/multer");
router.route("/getMessages").post(getMessages);
router.route("/uploadFile").post(fileUpload.single("file"), uploadFile);
router
  .route("/uploadAudioFile")
  .post(audioFileUpload.single("audio"), uploadFile);
router.route("/unreadMessages").get(getUnreadMessages);
router.route("/updateReadStatus").post(updatedMessageReadStatus);
module.exports = router;
