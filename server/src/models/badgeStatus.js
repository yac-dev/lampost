import mongoose from 'mongoose';

const badgeStatusSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  badge: {
    type: mongoose.Schema.ObjectId,
    ref: 'Badge',
  },
  url: {
    type: String,
  },
  // badgeの上にさらにそれを説明するbadgeが乗る感じ。まあ、便宜上ひとつひとつをtagと呼ぶことにする。
  tags: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Badge',
    },
  ],
  totalVotes: {
    type: Number,
    default: 0,
  },
  voters: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  detail: String,
});

const BadgeStatus = mongoose.model('BadgeStatus', badgeStatusSchema);
export default BadgeStatus;
