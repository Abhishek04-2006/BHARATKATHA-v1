import express from 'express';
import { chatWithCharacter } from '../controllers/characterController.js';

const router = express.Router();
router.post('/chat', chatWithCharacter);

export default router;