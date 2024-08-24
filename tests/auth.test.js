const request = require('supertest');
const app = require('../app'); // تأكد من تصدير التطبيق بشكل صحيح

describe('POST /api/auth/login', () => {
  it('should login and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
