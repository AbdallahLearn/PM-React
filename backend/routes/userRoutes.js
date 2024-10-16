import express from 'express';
import { registerUser, loginUser, authenticateToken } from '../controllers/userController.js';

const router = express.Router();


router.post('/register', registerUser);


router.post('/login', loginUser);


router.get('/protected-route', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

export default router;
