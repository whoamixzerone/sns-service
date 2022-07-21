const httpStatus = require('http-status');
const userService = require('../services/user.service');
const APIError = require('../exceptions/api.error');

const signUp = async (req, res, next) => {
  try {
    const result = await userService.createUser(req.body);
    if (result instanceof APIError) {
      throw result;
    }

    return res.status(httpStatus.CREATED).end();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  signUp,
};
