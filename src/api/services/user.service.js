const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const APIError = require('../exceptions/api.error');
const jwt = require('../utils/jwtToken');

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
        message: '가입되어 있는 사용자입니다',
      });
    }

    return user;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

const login = async (userDto) => {
  try {
    const user = await User.findOne({ where: { email: userDto.email } });
    if (!user) {
      return new APIError({
        status: httpStatus.NOT_FOUND,
        message: '존재하지 않는 사용자입니다',
      });
    }
    const isCompare = await bcrypt.compare(userDto.password, user.password);
    if (!isCompare) {
      return new APIError({
        status: httpStatus.NOT_FOUND,
        message: '아이디 혹은 비밀번호를 확인해주세요',
      });
    }

    const accessToken = jwt.generateAccessToken(user);

    return { accessToken };
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

module.exports = {
  createUser,
  login,
};
