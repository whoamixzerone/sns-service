const httpStatus = require('http-status');
const postService = require('../services/post.service');
const common = require('../utils/common');
const APIError = require('../exceptions/api.error');

const strToNumberId = (id) => (id === Number ? id : Number(id));

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
    id: strToNumberId(req.params.id),
    ...req.body,
    ...req.userDto,
  };

  try {
    const result = await postService.updatePost(postDto);
    if (Array.isArray(result) && result[0] === 0) {
      return next(
        new APIError({
          status: httpStatus.NOT_FOUND,
          message: '해당 게시물을 찾을 수 없습니다',
        }),
      );
    }
    if (common.isError(result)) {
      return next(result);
    }

    return res.status(httpStatus.OK).json({ id: postDto.id });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const delPost = async (req, res, next) => {
  const postDto = {
    id: strToNumberId(req.params.id),
    ...req.userDto,
  };

  try {
    const result = await postService.deletePost(postDto);
    if (result === 0) {
      return next(
        new APIError({
          status: httpStatus.NOT_FOUND,
          message: '해당 게시물을 찾을 수 없습니다',
        }),
      );
    }
    if (common.isError(result)) {
      return next(result);
    }

    return res.status(httpStatus.OK).json({ id: postDto.id });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const restorePost = async (req, res, next) => {
  const postDto = {
    id: strToNumberId(req.params.id),
    ...req.userDto,
  };

  try {
    const result = await postService.restorePost(postDto);
    if (result === 0) {
      return next(
        new APIError({
          status: httpStatus.NOT_FOUND,
          message: '해당 게시물을 찾을 수 없습니다',
        }),
      );
    }

    return res.status(httpStatus.OK).json({ id: postDto.id });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const getPost = async (req, res, next) => {
  const postDto = {
    id: strToNumberId(req.params.id),
    ...req.userDto,
  };

  try {
    const result = await postService.detailPost(postDto);
    if (result === null) {
      return next(
        new APIError({
          status: httpStatus.NOT_FOUND,
          message: '해당 게시물을 찾을 수 없습니다',
        }),
      );
    }

    return res.status(httpStatus.OK).json(result);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  createPost,
  setPost,
  delPost,
  restorePost,
  getPost,
};
