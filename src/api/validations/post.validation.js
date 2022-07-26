const Joi = require('joi');

// POST /api/posts
const createPost = {
  body: Joi.object({
    title: Joi.string().max(100).required(),
    content: Joi.string().required(),
  }),
};

// PATCH /api/posts/:id
const updatePost = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    title: Joi.string().max(100),
    content: Joi.string(),
  }),
};

// DELETE /api/posts/:id
const deletePost = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

// PATCH /api/posts/:id/restore
const restorePost = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

// GET /api/posts/:id
const getPost = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  restorePost,
  getPost,
};
