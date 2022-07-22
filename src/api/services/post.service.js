const httpStatus = require('http-status');
const APIError = require('../exceptions/api.error');
const Post = require('../models/post.model');

const createPost = async (postDto) => {
  try {
    const post = await Post.create(postDto);

    return post;
  } catch (err) {
    console.error(err);
    throw new APIError({
      status: err.statusCode,
      message: err.message,
    });
  }
};

const updatePost = async (postDto) => {
  try {
    return await Post.update(postDto, { where: { id: postDto.id } });
  } catch (err) {
    console.error(err);
    throw new APIError({
      status: err.statusCode,
      message: err.message,
    });
  }
};

const deletePost = async (postDto) => {
  try {
    return await Post.destroy({ where: { id: postDto.id } });
  } catch (err) {
    console.error(err);
    throw new APIError({
      status: err.statusCode,
      message: err.message,
    });
  }
};

const restorePost = async (postDto) => {
  try {
    return await Post.restore({ where: { id: postDto.id } });
  } catch (err) {
    console.error(err);
    throw new APIError({
      status: err.statusCode,
      message: err.message,
    });
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  restorePost,
};
