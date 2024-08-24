const { check, validationResult } = require('express-validator');

// Validation middleware for user registration
const validateUserRegistration = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation middleware for patient creation
const validatePatientCreation = [
  check('name', 'Name is required').not().isEmpty(),
  check('age', 'Age must be a number').isNumeric(),
  check('address', 'Address is required').not().isEmpty(),
  check('medicalHistory', 'Medical history is required').isArray(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateUserRegistration, validatePatientCreation };
