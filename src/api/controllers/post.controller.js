const httpStatus = require('http-status');
const postService = require('../services/post.service');
const common = require('../utils/common');

const createPost = async (req, res, next) => {
  const postDto = {
    ...req.body,
    ...req.userDto,
  };

  try {
    const result = await postService.createPost(postDto);
    if (common.isError(result)) {
      return next(result);
    }

    return res.status(httpStatus.CREATED).json({ id: result.id });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const setPost = async (req, res, next) => {
  const postDto = {
    id: req.params.id !== Number ? Number(req.params.id) : req.params.id,
    ...req.body,
    ...req.userDto,
  };

  try {
    const result = await postService.updatePost(postDto);
    if (common.isError(result)) {
      return next(result);
    }

    return res.status(httpStatus.OK).json({ id: postDto.id });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  createPost,
  setPost,
};
