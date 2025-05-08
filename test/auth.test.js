const request = require('supertest');
const app     = require('../server'); // export express app, not just listen()

describe('Auth routes', () => {
  it('registers a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'jestuser', password: 'pass123' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });
});
