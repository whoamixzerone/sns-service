const bcrypt = require('bcrypt');
const userService = require('../../src/api/services/user.service');
const User = require('../../src/api/models/user.model');

let req;
beforeEach(() => {
  req = {
    body: {
      email: 'test@gmail.com',
      password: '123456',
      name: '홍길동',
    },
  };

  User.findOrCreate = jest.fn();
});

describe('User Services createUser', () => {
  test('createUser 함수가 존재', () => {
    expect(typeof userService.createUser).toBe('function');
  });

  test('createUser 함수 호출', async () => {
    bcrypt.hash = jest.fn();
    User.findOrCreate.mockReturnValue(req.body);
    const user = await userService.createUser(req.body);

    expect(bcrypt.hash).toBeCalledTimes(1);
    expect(bcrypt.hash).toBeCalledWith(req.body.password, 12);
    expect(user).toStrictEqual(req.body);
  });
});
