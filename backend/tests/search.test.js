// backend/tests/search.test.js
const request = require('supertest');
const session = require('supertest-session');
const app = require('../server');
const db = require('../config/db');

let testSession = null;

beforeAll(done => {
  // clear searches & users
  db.serialize(() => {
    db.run(`DELETE FROM searches`);
    db.run(`DELETE FROM users`, done);
  });
});

afterAll(done => {
   db.close(err => done(err));
});
describe('Search routes (authenticated)', () => {
  const creds = { username: 'alice', password: 'Secret42!' };

  beforeAll(async () => {
    // register & log in
    await request(app).post('/auth/register').send(creds);
    testSession = session(app);
    await testSession.post('/auth/login').send(creds);
  });

  it('POST /search/save → 200 + id', async () => {
    const res = await testSession
      .post('/search/save')
      .send({ query: 'puppies' });
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBeGreaterThan(0);
  });

  it('GET /search/recent → 200 + array', async () => {
    const res = await testSession.get('/search/recent');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('query', 'puppies');
  });

  it('DELETE /search/:id → 200 on delete', async () => {
    // first grab a recent id
    const recent = await testSession.get('/search/recent');
    const id = recent.body[0].id;
    const res = await testSession.delete(`/search/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/);
  });
});
