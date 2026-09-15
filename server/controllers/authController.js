import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      xp: user.xp,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        xp: user.xp,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  res.json(req.user);
};
// Sync XP & Unlock Relic/Zone
export const unlockExplorerAchievement = async (req, res) => {
  const { relicId, pointsAwarded = 50 } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'Explorer not found' });

    let alreadyUnlocked = false;

    // Check if relic already unlocked
    if (relicId) {
      if (user.unlockedRelics.includes(relicId)) {
        alreadyUnlocked = true;
      } else {
        user.unlockedRelics.push(relicId);
      }
    }

    // Award points only if relic is newly unlocked or if generic exploration XP
    if (!alreadyUnlocked) {
      user.xp = (user.xp || 0) + Number(pointsAwarded);
      await user.save();
    }

    res.json({
      xp: user.xp,
      unlockedRelics: user.unlockedRelics,
      alreadyUnlocked,
      message: alreadyUnlocked 
        ? 'Relic already in archives' 
        : `Archived successfully! +${pointsAwarded} XP awarded.`
    });
  } catch (error) {
    console.error('Achievement Sync Error:', error);
    res.status(500).json({ message: 'Failed to record explorer achievement' });
  }
};
// Get Top Explorers for Codex Leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const explorers = await User.find()
      .select('name xp unlockedRelics createdAt')
      .sort({ xp: -1 })
      .limit(10);

    const rankedExplorers = explorers.map((user) => {
      let rankTier = 'Novice Chronicler';
      if (user.xp >= 1000) rankTier = 'Codex Master';
      else if (user.xp >= 500) rankTier = 'Imperial Historian';
      else if (user.xp >= 250) rankTier = 'Nalanda Scholar';

      return {
        _id: user._id,
        name: user.name,
        xp: user.xp || 0,
        relicsCount: user.unlockedRelics?.length || 0,
        rankTier
      };
    });

    res.json(rankedExplorers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch codex rankings' });
  }
};
