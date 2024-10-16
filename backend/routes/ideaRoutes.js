import express from 'express';
import { createIdea,updateIdea } from '../controllers/ideaController.js';
import { authenticateToken } from '../controllers/userController.js';

const router = express.Router();


router.post('/ideas',authenticateToken,createIdea);
router.patch('/ideas/:id', updateIdea)


export default router;
