const APIError = require('../exceptions/api.error');

const isError = (data) => {
  if (data instanceof APIError) {
    return true;
  }

  return false;
};

module.exports = {
  isError,
};
