const Patient = require('../models/patient');


exports.addPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    console.error('Error adding patient:', err);  // تسجيل الخطأ
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    console.error('Error fetching patients:', err);  // تسجيل الخطأ
    res.status(500).json({ message: 'Server error' });
  }
};

// أكمل بنفس الطريقة لبقية الوظائف...


exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.searchPatients = async (req, res) => {
  try {
    const query = req.query.query || '';
    const patients = await Patient.find({ name: new RegExp(query, 'i') });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
