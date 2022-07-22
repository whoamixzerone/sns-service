const postService = require('../../src/api/services/post.service');
const Post = require('../../src/api/models/post.model');

let req;
let res;
let next;
beforeAll(() => {
  req = {
    body: {
      title: '게시글 작성',
      content: '게시글 내용',
    },
  };
  next = jest.fn();

  Post.create = jest.fn();
});

describe('Post Service CreatePost', () => {
  test('createPost 함수가 존재', () => {
    expect(typeof postService.createPost).toBe('function');
  });

  test('createPost 함수 호출', async () => {
    const userDto = {
      ...req.body,
      userId: 1,
      writer: '홍길동',
    };
    Post.create.mockReturnValue(userDto);
    await postService.createPost(userDto);

    expect(Post.create).toBeCalledTimes(1);
    expect(Post.create).toBeCalledWith(userDto);
  });
});
