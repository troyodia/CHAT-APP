const express = require("express");
const router = express.Router();
const { register, login, getImage } = require("../contollers/auth");
const refreshAccessToken = require("../contollers/refreshTokenController");
const upload = require("../middleware/multer");

// router.post("/uploadsingle", upload.single("image"), getImage);
router.route("/register").post(register);

router.route("/login").post(login);
router.route("/refresh").get(refreshAccessToken);
module.exports = router;
