import mongoose from 'mongoose';

const libraryAndAssetRelationshipSchema = new mongoose.Schema({
  library: {
    type: mongoose.Schema.ObjectId,
    ref: 'Library',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'Asset',
  },
});

const LibraryAndAssetRelationship = mongoose.model('LibraryAndAssetRelationship', libraryAndAssetRelationshipSchema);

export default LibraryAndAssetRelationship;
