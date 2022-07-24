const postService = require('../../src/api/services/post.service');
const Post = require('../../src/api/models/post.model');

let req;
beforeAll(() => {
  req = {
    body: {
      title: '게시글 작성',
      content: '게시글 내용',
    },
  };

  Post.create = jest.fn();
  Post.update = jest.fn();
  Post.destroy = jest.fn();
  Post.restore = jest.fn();
  Post.findByPk = jest.fn();
  Post.findAll = jest.fn();
});

describe('Post Service CreatePost', () => {
  test('createPost 함수가 존재', () => {
    expect(typeof postService.createPost).toBe('function');
  });

  test('createPost 함수 호출', async () => {
    const postDto = {
      ...req.body,
      userId: 1,
      writer: '홍길동',
    };
    Post.create.mockReturnValue(postDto);
    await postService.createPost(postDto);

    expect(Post.create).toBeCalledTimes(1);
    expect(Post.create).toBeCalledWith(postDto);
  });
});

describe('Post Service UpdatePost', () => {
  test('updatePost 함수가 존재', () => {
    expect(typeof postService.updatePost).toBe('function');
  });

  test('updatePost 함수 호출', async () => {
    const postDto = {
      id: 2,
      userId: 1,
      writer: '홍길동',
      title: '게시글 제목',
    };
    Post.update.mockReturnValue([1]);
    const result = await postService.updatePost(postDto);

    expect(Post.update).toBeCalledTimes(1);
    expect(Post.update).toBeCalledWith(postDto, { where: { id: postDto.id } });
    expect(result).toStrictEqual([1]);
  });
});

describe('Post Service deletePost', () => {
  test('deletePost 함수가 존재', () => {
    expect(typeof postService.deletePost).toBe('function');
  });

  test('deletePost 함수 호출', async () => {
    const postDto = {
      id: 2,
    };
    Post.destroy.mockReturnValue(1);
    const result = await postService.deletePost(postDto);

    expect(Post.destroy).toBeCalledTimes(1);
    expect(Post.destroy).toBeCalledWith({ where: { id: postDto.id } });
    expect(result).toBe(1);
  });
});

describe('Post Service RestorePost', () => {
  test('restorePost 함수가 존재', () => {
    expect(typeof postService.restorePost).toBe('function');
  });

  test('restrePost 함수 호출', async () => {
    const postDto = {
      id: 2,
    };
    Post.restore.mockReturnValue(Promise);
    const result = await postService.restorePost(postDto);

    expect(Post.restore).toBeCalledTimes(1);
    expect(Post.restore).toBeCalledWith({ where: { id: postDto.id } });
    expect(result).toBe(Promise);
  });
});

describe('Post Service detailPost', () => {
  test('detailPost 함수가 존재', () => {
    expect(postService.detailPost).toBeDefined();
  });

  test('detailPost 함수 호출', async () => {
    const postDto = {
      id: 2,
    };
    const data = {
      id: 2,
      writer: '홍길동',
      title: '게시글 제목',
      content: '게시글 내용',
      createdAt: '2022-07-22 06:53:01',
      updatedAt: '2022-07-22 12:00:46',
    };
    Post.findByPk.mockReturnValue(data);
    const result = await postService.detailPost(postDto);

    expect(Post.findByPk).toBeCalledTimes(1);
    expect(Post.findByPk).toBeCalledWith(postDto.id);
    expect(result).toBe(data);
  });
});

describe('Post Service getPosts List', () => {
  test('listPost 함수가 존재', () => {
    expect(typeof postService.listPost).toBe('function');
  });

  test('listPost 함수 호출', async () => {
    const data = [
      {
        id: 2,
        writer: '홍길동',
        title: '게시글 제목',
        content: '게시글 내용',
        createdAt: '2022-07-22 06:53:01',
        updatedAt: '2022-07-22 12:00:46',
      },
      {
        id: 3,
        writer: '장보고',
        title: '게시글',
        content: '게시글',
        createdAt: '2022-07-23 06:53:01',
        updatedAt: '2022-07-23 12:00:46',
      },
    ];
    Post.findAll.mockReturnValue(data);
    const result = await postService.listPost();

    expect(Post.findAll).toBeCalledTimes(1);
    expect(Post.findAll).toBeCalledWith();
    expect(result).toStrictEqual(data);
  });
});
