// controllers/appointmentController.js
const Appointment = require('../models/Appointment');

// إضافة موعد جديد
exports.createAppointment = async (req, res) => {
  const { patientId, doctorId, date, time } = req.body;
  try {
    const appointment = new Appointment({ patientId, doctorId, date, time });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// الحصول على جميع المواعيد
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// الحصول على موعد بواسطة المعرف
exports.getAppointmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// تحديث موعد بواسطة المعرف
exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { patientId, doctorId, date, time } = req.body;
  try {
    const appointment = await Appointment.findByIdAndUpdate(id, { patientId, doctorId, date, time }, { new: true });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// حذف موعد بواسطة المعرف
exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
