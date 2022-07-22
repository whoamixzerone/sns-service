const express = require('express');
const { validate } = require('express-validation');
const { postController } = require('../controllers');
const { isVerifyToken } = require('../middlewares/auth.middleware');
const {
  createPost,
  updatePost,
  deletePost,
  getPost,
} = require('../validations/post.validation');

const router = express.Router();

router.post('/', validate(createPost), isVerifyToken, postController.setPost);

module.exports = router;
