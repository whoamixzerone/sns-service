const httpStatus = require('http-status');
const postService = require('../services/post.service');
const common = require('../utils/common');

const createPost = async (req, res, next) => {
  const userDto = {
    ...req.body,
    ...req.userDto,
  };

  try {
    const result = await postService.createPost(userDto);
    if (common.isError(result)) {
      return next(result);
    }

    return res.status(httpStatus.CREATED).end();
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  createPost,
};
