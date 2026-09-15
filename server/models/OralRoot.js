import mongoose from 'mongoose';

const oralRootSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  region: { type: String, required: true },
  contributorName: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  story: { type: String, required: true },
  eraTag: { 
    type: String, 
    enum: ['Ancient', 'Medieval', 'Colonial', 'Freedom', 'Folk Tradition'], 
    default: 'Folk Tradition' 
  },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('OralRoot', oralRootSchema);