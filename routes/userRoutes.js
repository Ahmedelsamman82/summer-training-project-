// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware'); // Ensure this path is correct

// Routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', authenticate, userController.getUserProfile); // This should work if authenticate is defined
router.put('/profile', authenticate, userController.updateUserProfile);

module.exports = router;
