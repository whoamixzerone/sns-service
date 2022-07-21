const express = require('express');
const { validate } = require('express-validation');
const { userController } = require('../controllers');
const { createUser, signIn } = require('../validations/user.validation');

const router = express.Router();

router.post('/signup', validate(createUser), userController.signUp);
router.post('/signin', validate(signIn), userController.signIn);

module.exports = router;
