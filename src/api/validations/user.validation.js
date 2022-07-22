const Joi = require('joi');

// POST /api/user/signup
const createUser = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(128).required(),
    name: Joi.string().required(),
  }),
};

// POST /api/user/signin
const signIn = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(128).required(),
  }),
};

module.exports = {
  createUser,
  signIn,
};
