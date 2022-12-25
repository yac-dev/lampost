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
  firstThreeReactions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Reaction',
    },
    // ここは、要素3つまで、
  ],
  totalReactions: Number,
  createdAt: Date,
});

const AssetPost = mongoose.model('AssetPost', assetPostSchema);
export default AssetPost;
