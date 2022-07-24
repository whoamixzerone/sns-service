const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const httpStatus = require('http-status');
const User = require('../../models/user.model');
const APIError = require('../../exceptions/api.error');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_ACCESS_SECRET_KEY;

module.exports = () => {
  passport.use(
    'jwt',
    new JwtStrategy(opts, async (payload, done) => {
      try {
        const user = await User.findOne({ where: { id: payload.id } });
        if (user) {
          return done(null, user);
        }

        return done(
          null,
          false,
          new APIError({
            status: httpStatus.UNAUTHORIZED,
            message: '유효하지 않는 토큰입니다',
          }),
        );
      } catch (err) {
        console.error('JwtStrategy >>> ', err);
        if (err.name === 'TokenExpiredError') {
          return done(
            null,
            false,
            new APIError({
              status: httpStatus.FORBIDDEN,
              message: '토큰이 만료되었습니다',
            }),
          );
        }

        return done(err);
      }
    }),
  );
};
