// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, getAppointmentById, updateAppointment, deleteAppointment } = require('../controllers/appointmentController');

// إضافة موعد جديد
router.post('/appointments', createAppointment);

// الحصول على جميع المواعيد
router.get('/appointments', getAppointments);

// الحصول على موعد بواسطة المعرف
router.get('/appointments/:id', getAppointmentById);

// تحديث موعد بواسطة المعرف
router.put('/appointments/:id', updateAppointment);

// حذف موعد بواسطة المعرف
router.delete('/appointments/:id', deleteAppointment);

module.exports = router;
