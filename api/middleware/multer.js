const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profiles/");
  },
  filename: function (req, file, cb) {
    cb(
      null,

      file.originalname + Date.now() + path.extname(file.originalname)
    );
  },
});
const uplaod = multer({ storage });
module.exports = uplaod;
