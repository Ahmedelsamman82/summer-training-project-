const express = require('express');
const router = express.Router();
const {
  addPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  searchPatients
} = require('../controllers/patientController');

router.post('/', addPatient);
router.get('/', getAllPatients);
router.get('/:id', getPatientById);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);
router.get('/search', searchPatients);

module.exports = router;
