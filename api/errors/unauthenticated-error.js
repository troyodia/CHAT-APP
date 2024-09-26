const { StatusCodes } = require("http-status-codes");
const CustomerError = require("./custom-error");

class UnauthenticatedError extends CustomerError {
  constructor(message) {
    super(message);
    this.name = "Unauthenticated Error";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
module.exports = UnauthenticatedError;
