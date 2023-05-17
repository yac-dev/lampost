import mongoose from 'mongoose';

const libraryAndAssetRelationshipSchema = new mongoose.Schema({
  library: {
    type: mongoose.Schema.ObjectId,
    ref: 'Library',
  },
  asset: {
    type: mongoose.Schema.ObjectId,
    ref: 'Asset',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  reactions: [
    {
      reaction: {
        type: mongoose.Schema.ObjectId,
        ref: 'Reaction',
      },
      user: { type: mongoose.Schema.ObjectId },
      comment: String,
    },
  ],
  createdAt: Date,
});

const LibraryAndAssetRelationship = mongoose.model('LibraryAndAssetRelationship', libraryAndAssetRelationshipSchema);

export default LibraryAndAssetRelationship;
