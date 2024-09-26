const { StatusCodes } = require("http-status-codes");
const CustomerError = require("./custom-error");

class BadRequestError extends CustomerError {
  constructor(message) {
    super(message);
    this.name = "Bad Request Error";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
module.exports = BadRequestError;
