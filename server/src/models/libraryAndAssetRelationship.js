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
  reactions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Reaction',
    },
  ],
});

const LibraryAndAssetRelationship = mongoose.model('LibraryAndAssetRelationship', libraryAndAssetRelationshipSchema);

export default LibraryAndAssetRelationship;
