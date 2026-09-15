import express from 'express';
import { getOralRoots, createOralRoot, toggleUpvoteStory } from '../controllers/oralRootsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', getOralRoots);
router.post('/', protect, createOralRoot);
router.put('/:id/upvote', protect, toggleUpvoteStory);

export default router;