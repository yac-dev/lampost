import mongoose from 'mongoose';

const badgeAndBadgeTypeRelationshipSchema = new mongoose.Schema({
  badge: {
    type: mongoose.Schema.ObjectId,
    ref: 'Badge',
  },
  badgeType: {
    type: mongoose.Schema.ObjectId,
    ref: 'BadgeType',
  },
});

const BadgeAndBadgeTypeRelationship = mongoose.model(
  'BadgeAndBadgeTypeRelationship',
  badgeAndBadgeTypeRelationshipSchema
);
export default BadgeAndBadgeTypeRelationship;
