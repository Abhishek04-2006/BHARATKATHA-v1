import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({
  chapterTitle: { type: String, required: true },
  content: { type: String, required: true }
});

const chronicleSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  era: { type: String, required: true },
  character: { type: String, required: true },
  conflict: { type: String, required: true },
  summary: { type: String, default: '' },
  chapters: [chapterSchema],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  authorName: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Chronicle', chronicleSchema);