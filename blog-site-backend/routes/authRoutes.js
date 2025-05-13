// routes/authRoutes.js

const express = require('express');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', signup);

// POST /api/auth/login
router.post('/login', login);

// Export the router to use in app.js
module.exports = router;
