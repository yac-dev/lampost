import mongoose from 'mongoose';

const badgeAndUserRelationshipSchema = new mongoose.Schema({
  badge: {
    type: mongoose.Schema.ObjectId,
    ref: 'Badge',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  passion: Number,
  emoji: {
    type: String,
    default: '🔥',
  },
  createdAt: Date,
});

const BadgeAndUserRelationship = mongoose.model('BadgeAndUserRelationship', badgeAndUserRelationshipSchema);
export default BadgeAndUserRelationship;
