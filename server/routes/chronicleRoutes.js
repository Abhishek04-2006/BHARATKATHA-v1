import express from 'express';
import { getChronicles, publishChronicle, toggleLikeChronicle } from '../controllers/chronicleController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getChronicles);
router.post('/', protect, publishChronicle);
router.put('/:id/like', protect, toggleLikeChronicle);

export default router;