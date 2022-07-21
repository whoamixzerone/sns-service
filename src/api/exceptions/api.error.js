const httpStatus = require('http-status');
const ExtandableError = require('./extandable-error');

class APIError extends ExtandableError {
  constructor({ message, status = httpStatus.INTERNAL_SERVER_ERROR }) {
    super({ message, status });
  }
}

module.exports = APIError;
