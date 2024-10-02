const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    cb(null, file.filename + "-" + Date.now() + ext);
  },
});

const uplaod = multer({ storage });
module.exports = uplaod;
