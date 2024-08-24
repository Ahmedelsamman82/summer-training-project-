const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('User API', () => {
  let token;

  beforeAll(async () => {
    // Register and login to get a token
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
      });
    token = registerResponse.body.token;
  });

  // Test getting all users
  it('should get all users', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  // Test updating a user
  it('should update a user', async () => {
    const user = await User.create({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
    });

    const response = await request(app)
      .put(`/api/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated User' });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Updated User');
  });
});
