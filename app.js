// app.js
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes'); 
const patientRoutes = require('./routes/patientRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const appointmentRoutes = require('./routes/appointmentRoutes'); 
const billingRoutes = require('./routes/billingRoutes'); 
require('dotenv').config();



const app = express();
connectDB();

app.use(express.json());

// إعداد المسارات
app.use('/api/auth', authRoutes);
app.use('/api', patientRoutes);
app.use('/api/patients', authMiddleware, patientRoutes);
app.use('/api', doctorRoutes);
app.use('/api', appointmentRoutes);
app.use('/api', billingRoutes);
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
