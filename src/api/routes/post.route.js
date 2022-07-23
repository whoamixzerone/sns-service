const express = require('express');
const { validate } = require('express-validation');
const { postController } = require('../controllers');
const {
  isVerifyToken,
  isAuthorPost,
} = require('../middlewares/auth.middleware');
const {
  createPost,
  updatePost,
  deletePost,
  restorePost,
  getPost,
} = require('../validations/post.validation');

const router = express.Router();

router.post(
  '/',
  validate(createPost),
  isVerifyToken,
  postController.createPost,
);

router.patch(
  '/:id',
  validate(updatePost),
  isVerifyToken,
  isAuthorPost,
  postController.setPost,
);

router.delete(
  '/:id',
  validate(deletePost),
  isVerifyToken,
  isAuthorPost,
  postController.delPost,
);

router.patch(
  '/:id/restore',
  validate(restorePost),
  isVerifyToken,
  isAuthorPost,
  postController.restorePost,
);

router.get('/:id', validate(getPost), isVerifyToken, postController.getPost);

module.exports = router;
