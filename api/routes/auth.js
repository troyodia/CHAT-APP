const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  createProfile,
  addProfileImage,
  deleteProfileImage,
} = require("../contollers/auth");
const refreshAccessToken = require("../contollers/refreshTokenController");
const authorize = require("../middleware/authorize");

// router.post("/uploadsingle", upload.single("image"), getImage);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(authorize, logout);

router.route("/profile").post(authorize, createProfile);
router.route("/add-profile-image").post(authorize, addProfileImage);
router.route("/delete-profile-image").delete(authorize, deleteProfileImage);

router.route("/refresh").get(refreshAccessToken);
module.exports = router;
