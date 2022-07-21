const express = require('express');
const { validate } = require('express-validation');
const { userController } = require('../controllers');
const { createUser } = require('../validations/user.validation');

const router = express.Router();

router.post('/signup', validate(createUser), userController.signUp);

module.exports = router;
