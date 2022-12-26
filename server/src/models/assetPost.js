import mongoose from 'mongoose';

const assetPostSchema = new mongoose.Schema({
  caption: {
    type: String,
    maxLength: 40,
  },
  assets: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Asset',
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  library: {
    type: mongoose.Schema.ObjectId,
    ref: 'Library',
  },
  firstFourReactions: [
    {
      reaction: {
        type: mongoose.Schema.ObjectId,
        ref: 'Reaction',
      },
      totalCounts: Number,
    },
    // ここは、要素4つまで、
  ],
  totalReactions: Number,
  createdAt: Date,
});

const AssetPost = mongoose.model('AssetPost', assetPostSchema);
export default AssetPost;
