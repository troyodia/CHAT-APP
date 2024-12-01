const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profiles/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + Date.now() + path.extname(file.originalname));
  },
});
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/files/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
const fileUpload = multer({ storage: fileStorage });

module.exports = { upload, fileUpload };
