import mongoose from 'mongoose';

const badgeTypeAndBadgeRelationshipSchema = new mongoose.Schema({
  badgeType: {
    type: mongoose.Schema.ObjectId,
    ref: 'BadgeType',
  },
  badge: {
    type: mongoose.Schema.ObjectId,
    ref: 'Badge',
  },
});

const BadgeTypeAndBadgeRelationship = mongoose.model(
  'BadgeTypeAndBadgeRelationship',
  badgeTypeAndBadgeRelationshipSchema
);
export default BadgeTypeAndBadgeRelationship;
