import Chronicle from '../models/Chronicle.js';
import User from '../models/User.js';

// Get all published chronicles for the public feed
export const getChronicles = async (req, res) => {
  try {
    const chronicles = await Chronicle.find()
      .populate('author', 'name xp')
      .sort({ createdAt: -1 });
    res.json(chronicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Publish a newly generated chronicle
export const publishChronicle = async (req, res) => {
  const { title, era, character, conflict, summary, chapters } = req.body;
  try {
    const chronicle = await Chronicle.create({
      title,
      era,
      character,
      conflict,
      summary,
      chapters,
      author: req.user._id,
      authorName: req.user.name
    });

    // Reward XP for creating and publishing lore
    await User.findByIdAndUpdate(req.user._id, { $inc: { xp: 200 } });

    res.status(201).json(chronicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like / Unlike a chronicle
export const toggleLikeChronicle = async (req, res) => {
  try {
    const chronicle = await Chronicle.findById(req.params.id);
    if (!chronicle) return res.status(404).json({ message: 'Chronicle not found' });

    const userId = req.user._id;
    const hasLiked = chronicle.likes.includes(userId);

    if (hasLiked) {
      chronicle.likes = chronicle.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      chronicle.likes.push(userId);
    }

    await chronicle.save();
    res.json({ likesCount: chronicle.likes.length, hasLiked: !hasLiked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};