// backend/tests/auth.test.js
const request = require('supertest');
const app = require('../server');
const db = require('../config/db');

beforeAll(done => {
  // wipe users table
  db.run(`DELETE FROM users`, done);
});

afterAll(done => {
  db.close(done);
});

describe('Auth routes', () => {
  const user = { username: 'testuser', password: 'Pass123!' };

  it('POST /auth/register → 201 on new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/registered successfully/i);
  });

  it('POST /auth/register → 400 on duplicate', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(user);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/taken/);
  });

  it('POST /auth/login → 200 on correct creds', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send(user);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/login successful/i);
    // capture cookie for later
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('POST /auth/login → 400 on wrong password', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: user.username, password: 'wrong' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/invalid credentials/i);
  });
});
