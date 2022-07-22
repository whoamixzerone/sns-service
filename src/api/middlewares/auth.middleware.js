const passport = require('passport');
const APIError = require('../exceptions/api.error');

/**
 * 토큰 검증 미들웨어
 * passport-jwt 모듈 사용
 */
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

    req.userDto = { userId: user.id, writer: user.name };
    next();
  })(req, res, next);
};

module.exports = {
  isVerifyToken,
};
