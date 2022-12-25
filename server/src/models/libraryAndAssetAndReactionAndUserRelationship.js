import mongoose from 'mongoose';

const libraryAndAssetAndReactionAndUserRelationshipSchema = new mongoose.Schema({
  library: {
    type: mongoose.Schema.ObjectId,
    ref: 'Library',
  },
  asset: {
    type: mongoose.Schema.ObjectId,
    ref: 'Asset',
  },
  reaction: {
    type: mongoose.Schema.ObjectId,
    ref: 'Reaction',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    red: 'User',
  },
  createdAt: Date,
});

const LibraryAndAssetAndReactionAndUserRelationship = mongoose.model(
  'LibraryAndAssetAndReactionAndUserRelationship',
  libraryAndAssetAndReactionAndUserRelationshipSchema
);

export default LibraryAndAssetAndReactionAndUserRelationship;
