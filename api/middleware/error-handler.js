const { StatusCodes } = require("http-status-codes");
const { CustomerError } = require("../errors");

const errorHandler = (err, req, res, next) => {
  const customErr = {
    msg: err.message || "something went wrong",
    statusCode: err.statusCode || 500,
  };
  if (err.code && err.code === 11000) {
    customErr.msg = "Duplication error for " + Object.keys(err.keyValue);
    customErr.statusCode = 400;
  }
  if (err.name === "ValidationError") {
    customErr.msg =
      "Validation Error, " +
      Object.keys(err.errors)
        .map((error) => {
          return err.errors[error].message;
        })
        .join(", ");
    customErr.statusCode = 400;
  }
  //ADD CAST ERROR
  //   res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });

  res.status(customErr.statusCode).json({ msg: customErr.msg });
};
module.exports = errorHandler;
