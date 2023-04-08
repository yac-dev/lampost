import mongoose from 'mongoose';

const userReactionSchema = new mongoose.Schema({
  libraryAsset: {
    type: mongoose.Schema.ObjectId,
    ref: 'LibraryAndAssetRelationship',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  reaction: {
    type: mongoose.Schema.ObjectId,
    ref: 'Reaction',
  },
  upvoted: Number,
});

const UserReaction = mongoose.model('UserReaction', userReactionSchema);
export default UserReaction;
