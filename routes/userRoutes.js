const express = require('express');
const { registerUser, loginUser, getUserDetails } = require('../controllers/UserController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// User Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/details', authenticateToken, getUserDetails); 

module.exports = router;

