import mongoose from 'mongoose';

const libraryAndAssetRelationshipAndReactionRelationshipAndUserRelationshipSchema = new mongoose.Schema({
  libraryAndAssetRelationshipAndReactionRelationship: {
    type: mongoose.Schema.ObjectId,
    ref: 'LibraryAndAssetRelationshipAndReactionRelationship',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    red: 'User',
  },
});

const libraryAndAssetRelationshipAndReactionRelationshipAndUserRelationship = mongoose.model(
  'LibraryAndAssetRelationshipAndReactionRelationshipAndUserRelationship',
  libraryAndAssetRelationshipAndReactionRelationshipAndUserRelationshipSchema
);

export default libraryAndAssetRelationshipAndReactionRelationshipAndUserRelationship;
