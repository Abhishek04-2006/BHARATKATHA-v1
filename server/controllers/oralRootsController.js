import OralRoot from '../models/OralRoot.js';
import User from '../models/User.js';

export const getOralRoots = async (req, res) => {
  try {
    const stories = await OralRoot.find()
      .populate('author', 'name xp')
      .sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createOralRoot = async (req, res) => {
  const { title, region, story, eraTag } = req.body;
  try {
    const newStory = await OralRoot.create({
      title,
      region,
      story,
      eraTag,
      contributorName: req.user.name,
      author: req.user._id
    });

    // Reward XP for community preservation
    await User.findByIdAndUpdate(req.user._id, { $inc: { xp: 150 } });

    res.status(201).json(newStory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleUpvoteStory = async (req, res) => {
  try {
    const story = await OralRoot.findById(req.params.id);
    if (!story) return res.status(404).json({ message: 'Story not found' });

    const userId = req.user._id;
    const hasUpvoted = story.upvotes.includes(userId);

    if (hasUpvoted) {
      story.upvotes = story.upvotes.filter((id) => id.toString() !== userId.toString());
    } else {
      story.upvotes.push(userId);
    }

    await story.save();
    res.json({ upvotesCount: story.upvotes.length, hasUpvoted: !hasUpvoted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};