const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../src/app');
const Post = require('../../src/models/Post');
const User = require('../../src/models/User');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Post.deleteMany();
  await User.deleteMany();
});

describe('POST /api/posts', () => {
  it('should create a new post', async () => {
    const user = await User.create({ username: 'testuser', password: 'password123' });
    const token = user.generateToken(); // You may need to adapt this

    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Post',
        content: 'This is a test post'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Post');
  });
});
