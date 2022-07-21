const bcrypt = require('bcrypt');
const httpMocks = require('node-mocks-http');
const httpStatus = require('http-status');
const userController = require('../../src/api/controllers/user.controller');
const userService = require('../../src/api/services/user.service');
const User = require('../../src/api/models/user.model');
const jwt = require('../../src/api/utils/jwtToken');
const APIError = require('../../src/api/exceptions/api.error');

let req;
let res;
let next;
beforeAll(() => {
  req = {
    body: {
      email: 'test@gmail.com',
      password: '123456',
      name: '홍길동',
    },
  };

  next = jest.fn();

  User.findOne = jest.fn();
  User.findOrCreate = jest.fn();
});

describe('User Services createUser', () => {
  test('createUser 함수가 존재', () => {
    expect(typeof userService.createUser).toBe('function');
  });

  test('createUser 함수 호출', async () => {
    bcrypt.hash = jest.fn();
    User.findOrCreate.mockReturnValue([req.body, true]);
    const user = await userService.createUser(req.body);

    expect(bcrypt.hash).toBeCalledTimes(1);
    expect(bcrypt.hash).toBeCalledWith(req.body.password, 12);
    expect(req.body).toStrictEqual(user);
  });
});

describe('User Services login', () => {
  test('login 함수가 존재', () => {
    expect(typeof userService.login).toBe('function');
  });

  test('login 함수 호출', async () => {
    req = {
      body: {
        email: 'test@gmail.com',
        password: '123456',
      },
    };
    const data = {
      id: 1,
      email: 'test@gmail.com',
      name: '홍길동',
    };
    bcrypt.compare = jest.fn();
    jwt.generateAccessToken = jest.fn();
    User.findOne.mockReturnValue(data);
    bcrypt.compare.mockReturnValue(true);

    await userService.login(req.body);

    expect(User.findOne).toBeCalledTimes(1);
    expect(bcrypt.compare).toBeCalledTimes(1);
    expect(jwt.generateAccessToken).toBeCalledTimes(1);
    expect(jwt.generateAccessToken).toBeCalledWith(data);
  });
});

describe('User Controller signUp', () => {
  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();

    req.body = {
      email: 'test@gmail.com',
      password: '123456',
      name: '홍길동',
    };
    res.end = jest.fn();

    userService.createUser = jest.fn();
  });

  test('signUp 함수가 존재', () => {
    expect(typeof userController.signUp).toBe('function');
  });

  test('signUp 함수 호출', async () => {
    await userController.signUp(req, res, next);
    expect(userService.createUser).toBeCalledTimes(1);
    expect(userService.createUser).toBeCalledWith(req.body);
  });

  test('response status 201 반환', async () => {
    await userController.signUp(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res.end).toBeCalledTimes(1);
  });

  test('존재하는 사용자 APIError', async () => {
    userService.createUser.mockReturnValue(new APIError('test'));
    await userController.signUp(req, res, next);
    expect(next).toBeCalledTimes(1);
  });
});

describe('User Controller signIn', () => {
  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();

    req.body = {
      email: 'test@gmail.com',
      password: '123456',
      name: '홍길동',
    };
    res.json = jest.fn();

    userService.login = jest.fn();
  });

  test('signIn 함수가 존재', () => {
    expect(typeof userController.signIn).toBe('function');
  });

  test('signIn 함수 호출', async () => {
    await userController.signIn(req, res, next);
    expect(userService.login).toBeCalledTimes(1);
    expect(userService.login).toBeCalledWith(req.body);
  });

  test('response statusCode 200 반환', async () => {
    userService.login.mockReturnValue({ accessToken: 'token' });
    await userController.signIn(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res.json).toBeCalledWith({ accessToken: 'token' });
  });
});
