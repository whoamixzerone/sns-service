const httpStatus = require('http-status');
const userService = require('../services/user.service');
const APIError = require('../exceptions/api.error');

const isError = (data) => {
  if (data instanceof APIError) {
    return true;
  }

  return false;
};

const signUp = async (req, res, next) => {
  try {
    const result = await userService.createUser(req.body);
    if (isError(result)) {
      return next(result);
    }

    return res.status(httpStatus.CREATED).end();
  } catch (err) {
    return next(err);
  }
};

const signIn = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    if (isError(result)) {
      return next(result);
    }

    return res.status(httpStatus.OK).json(result);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  signUp,
  signIn,
};
