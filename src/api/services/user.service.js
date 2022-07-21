const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const APIError = require('../exceptions/api.error');

const createUser = async (userDto) => {
  try {
    const hash = await bcrypt.hash(userDto.password, 12);

    const [user, isCreated] = await User.findOrCreate({
      where: { email: userDto.email },
      defaults: {
        email: userDto.email,
        password: hash,
        name: userDto.name,
      },
    });

    if (!isCreated) {
      return new APIError({
        status: httpStatus.CONFLICT,
        message: '가입되어 있는 사용자입니다.',
      });
    }

    return user;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

module.exports = {
  createUser,
};
