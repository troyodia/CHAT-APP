class CustomerError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = CustomerError;
