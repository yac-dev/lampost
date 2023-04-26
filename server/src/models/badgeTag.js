import mongoose from 'mongoose';

// 😎 5 years experienced 的な感じ。
const badgeTagSchema = new mongoose.Schema({
  emoji: {
    type: String,
  },
  title: {
    type: String,
  },
  userBadge: {
    type: mongoose.Schema.ObjectId,
    ref: 'BadgeAndUserRelationship',
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: Date,
});

const BadgeTag = mongoose.model('BadgeTag', badgeTagSchema);
export default BadgeTag;
