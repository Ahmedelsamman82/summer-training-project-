// routes/doctorRoutes.js
const express = require('express');
const router = express.Router();
const { addDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor } = require('../controllers/doctorController');

// إضافة طبيب جديد
router.post('/doctors', addDoctor);

// الحصول على جميع الأطباء
router.get('/doctors', getAllDoctors);

// الحصول على طبيب بواسطة المعرف
router.get('/doctors/:id', getDoctorById);

// تحديث طبيب بواسطة المعرف
router.put('/doctors/:id', updateDoctor);

// حذف طبيب بواسطة المعرف
router.delete('/doctors/:id', deleteDoctor);

module.exports = router;
