/* eslint-disable consistent-return */
const httpStatus = require('http-status');
const passport = require('passport');
const APIError = require('../exceptions/api.error');
const Post = require('../models/post.model');

/**
 * 토큰 검증 미들웨어
 * passport-jwt 모듈 사용
 */
const isVerifyToken = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.error(err);
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

/**
 * 작성자 검증 미들웨어
 */
const isAuthorPost = async (req, res, next) => {
  const postId =
    req.params.id !== Number ? Number(req.params.id) : req.params.id;
  const { userId } = req.userDto;

  try {
    const post = await Post.findByPk(postId, { paranoid: false });
    if (post === null) {
      return next(
        new APIError({
          status: httpStatus.NOT_FOUND,
          message: '해당 게시물을 찾을 수 없습니다',
        }),
      );
    }

    if (userId !== post.userId) {
      return next(
        new APIError({
          status: httpStatus.FORBIDDEN,
          message: '해당 작성자만 할 수 있습니다',
        }),
      );
    }

    next();
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  isVerifyToken,
  isAuthorPost,
};
