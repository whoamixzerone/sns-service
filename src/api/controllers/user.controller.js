const httpStatus = require('http-status');
const userService = require('../services/user.service');
const common = require('../utils/common');

const signUp = async (req, res, next) => {
  try {
    const result = await userService.createUser(req.body);
    if (common.isError(result)) {
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
    if (common.isError(result)) {
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
