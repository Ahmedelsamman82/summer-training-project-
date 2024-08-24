const request = require('supertest');
const app = require('../app');
const Appointment = require('../models/Appointment');

describe('Appointment API', () => {
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

  // Test creating an appointment
  it('should create a new appointment', async () => {
    const response = await request(app)
      .post('/api/appointments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        patientId: 'somePatientId',
        doctorId: 'someDoctorId',
        date: '2024-08-15T10:00:00Z',
        notes: 'Initial consultation',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  // Test getting an appointment by ID
  it('should get appointment by ID', async () => {
    const appointment = await Appointment.create({
      patientId: 'somePatientId',
      doctorId: 'someDoctorId',
      date: '2024-08-15T10:00:00Z',
      notes: 'Follow-up',
    });

    const response = await request(app)
      .get(`/api/appointments/${appointment._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.notes).toBe('Follow-up');
  });
});
