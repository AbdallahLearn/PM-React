import express from 'express';
import { createIdea,updateIdea, getAllIdeas } from '../controllers/ideaController.js';
import { authenticateToken } from '../controllers/userController.js';

const router = express.Router();


router.post('/all-ideas',authenticateToken,createIdea);
router.patch('/all-ideas/:id', updateIdea)
router.get('/all-ideas',getAllIdeas);
// router.put('/all-ideas/:id',getIdea);

export default router;
