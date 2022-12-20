import mongoose from 'mongoose';

const libraryAndAssetRelationshipAndReactionRelationshipSchema = new mongoose.Schema({
  libraryAndAssetRelationship: {
    type: mongoose.Schema.ObjectId,
    ref: 'LibraryAndAssetRelationship',
  },
  reactions: [
    {
      reaction: {
        type: mongoose.Schema.ObjectId,
        ref: 'Reaction',
      },
      totalCount: Number,
      users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    },
  ],
});

const LibraryAndAssetRelationshipAndReactionRelationship = mongoose.model(
  'LibraryAndAssetRelationshipAndReactionRelationship',
  libraryAndAssetRelationshipAndReactionRelationshipSchema
);
export default LibraryAndAssetRelationshipAndReactionRelationship;
