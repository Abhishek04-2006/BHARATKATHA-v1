import express from 'express';
import { registerUser, loginUser, getUserProfile, unlockExplorerAchievement, getLeaderboard } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.post('/achievement', protect, unlockExplorerAchievement);
router.get('/leaderboard', getLeaderboard);

export default router;