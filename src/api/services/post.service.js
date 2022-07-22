const httpStatus = require('http-status');
const APIError = require('../exceptions/api.error');
const Post = require('../models/post.model');

const createPost = async (userDto) => {
  try {
    const post = await Post.create(userDto);

    return post;
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
};
