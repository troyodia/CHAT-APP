const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  createProfile,
  addProfileImage,
  deleteProfileImage,
  generateZegoToken,
  getOnlinestatus,
} = require("../contollers/auth");
const refreshAccessToken = require("../contollers/refreshTokenController");
const authorize = require("../middleware/authorize");
const { upload } = require("../middleware/multer");
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(authorize, logout);

router.route("/profile").post(authorize, createProfile);
router
  .route("/add-profile-image")
  .post(authorize, upload.single("image"), addProfileImage);
router.route("/delete-profile-image").delete(authorize, deleteProfileImage);

router.route("/refresh").get(refreshAccessToken);
router.route("/generate-Zego-Token").get(authorize, generateZegoToken);
router.route("/isOnline").post(authorize, getOnlinestatus);
module.exports = router;
