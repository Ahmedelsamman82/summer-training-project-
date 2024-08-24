const request = require('supertest');
const app = require('../app');
const Doctor = require('../models/Doctor');

describe('Doctor API', () => {
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

  // Test adding a doctor
  it('should add a new doctor', async () => {
    const response = await request(app)
      .post('/api/doctors')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Dr. Smith',
        specialty: 'Cardiology',
        phone: '555-5555',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  // Test updating a doctor
  it('should update a doctor', async () => {
    const doctor = await Doctor.create({
      name: 'Dr. Adams',
      specialty: 'Neurology',
      phone: '555-1234',
    });

    const response = await request(app)
      .put(`/api/doctors/${doctor._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ specialty: 'Orthopedics' });

    expect(response.statusCode).toBe(200);
    expect(response.body.specialty).toBe('Orthopedics');
  });
});
