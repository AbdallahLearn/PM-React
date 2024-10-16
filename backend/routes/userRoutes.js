import express from 'express';
import { registerUser, loginUser, authenticateToken } from '../controllers/userController.js';

const router = express.Router();

// User Registration
router.post('/register', registerUser);

// User Login
router.post('/login', loginUser);

// Protected Route Example
router.get('/protected-route', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

export default router;
