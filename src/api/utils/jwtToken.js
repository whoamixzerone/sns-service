const jwt = require('jsonwebtoken');

const generateAccessToken = (userDto) =>
  jwt.sign(
    {
      type: 'access_token',
      id: userDto.id,
      name: userDto.name,
    },
    process.env.JWT_ACCESS_SECRET_KEY,
    {
      issuer: 'bfree',
      algorithm: process.env.JWT_ALGORITHM,
      expiresIn: process.env.JWT_ACCESS_EXPIRESIN,
    },
  );

module.exports = {
  generateAccessToken,
};
