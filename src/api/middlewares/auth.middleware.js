const passport = require('passport');
const APIError = require('../exceptions/api.error');

const isVerifyToken = async (req, res, next) => {
  // eslint-disable-next-line consistent-return
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.error('>>>> middle', err);
      return next(err);
    }

    if (!user) {
      return next(
        new APIError({
          status: info.status,
          message: info.message,
        }),
      );
    }

    req.userDto = { id: user.id, name: user.name };
    next();
  })(req, res, next);
};

module.exports = {
  isVerifyToken,
};
