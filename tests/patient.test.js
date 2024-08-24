const request = require('supertest');
const app = require('../app');
const Patient = require('../models/Patient');

describe('Patient API', () => {
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

  // Test creating a patient
  it('should create a new patient', async () => {
    const response = await request(app)
      .post('/api/patients')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
        age: 30,
        address: '123 Main St',
        medicalHistory: [],
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  // Test getting a patient by ID
  it('should get patient by ID', async () => {
    const patient = await Patient.create({
      name: 'Jane Doe',
      age: 28,
      address: '456 Elm St',
      medicalHistory: [],
    });

    const response = await request(app)
      .get(`/api/patients/${patient._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Jane Doe');
  });
});
