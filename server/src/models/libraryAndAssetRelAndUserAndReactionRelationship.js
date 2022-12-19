import mongoose from 'mongoose';

const libraryAndAssetRelAndUserAndReactionRelationshipSchema = new mongoose.Schema({
  // このassetに対して、誰がどのreactionを上げたか、そのrelationshipをまとめている。
  libraryAndAssetRelationship: {
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
});

const LibraryAndAssetAndReactionAndUserRelationship = mongoose.model(
  'LibraryAndAssetRelAndUserAndReactionRelationship',
  libraryAndAssetRelAndUserAndReactionRelationshipSchema
);
export default LibraryAndAssetAndReactionAndUserRelationship;
