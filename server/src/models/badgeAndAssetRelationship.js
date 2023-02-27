import mongoose from 'mongoose';

const badgeAndAssetRelationshipSchema = new mongoose.Schema({
  badge: {
    type: mongoose.Schema.ObjectId,
    ref: 'Badge',
  },
  asset: {
    type: mongoose.Schema.ObjectId,
    ref: 'Asset',
  },
  createdAt: Date,
});

const BadgeAndAssetRelationship = mongoose.model('BadgeAndAssetRelationship', badgeAndAssetRelationshipSchema);
export default BadgeAndAssetRelationship;
