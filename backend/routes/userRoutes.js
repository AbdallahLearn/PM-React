import express from 'express';
import { registerUser, loginUser, authenticateToken,getUser,getAllUsers } from '../controllers/userController.js';

const router = express.Router();


router.post('/register', registerUser);


router.post('/login', loginUser);
router.get('/all-users', getAllUsers);
router.get('/user/:id' , getUser)
router.get('/protected-route', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

export default router;
