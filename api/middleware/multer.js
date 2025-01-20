const multer = require("multer");

const fileFilter = (req, file, cb) => {
  console.log(file);
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};
const storage = multer.memoryStorage();
const fileStorage = multer.memoryStorage();
const audioFileStorage = multer.memoryStorage();
const upload = multer({ storage, fileFilter, limits: { fileSize: 5000000 } });
const fileUpload = multer({
  storage: fileStorage,
  limits: { fileSize: 5000000 },
});
const audioFileUpload = multer({
  storage: audioFileStorage,
  limits: { fileSize: 5000000 },
});

module.exports = { upload, fileUpload, audioFileUpload };
