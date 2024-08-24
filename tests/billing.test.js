const request = require('supertest');
const app = require('../app');
const Billing = require('../models/Billing');

describe('Billing API', () => {
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

  // Test creating a billing record
  it('should create a new billing record', async () => {
    const response = await request(app)
      .post('/api/billing')
      .set('Authorization', `Bearer ${token}`)
      .send({
        patientId: 'somePatientId',
        amount: 500,
        date: '2024-08-15T10:00:00Z',
        description: 'Consultation fee',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  // Test getting a billing record by ID
  it('should get billing record by ID', async () => {
    const billing = await Billing.create({
      patientId: 'somePatientId',
      amount: 300,
      date: '2024-08-15T10:00:00Z',
      description: 'Follow-up fee',
    });

    const response = await request(app)
      .get(`/api/billing/${billing._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.amount).toBe(300);
  });
});
