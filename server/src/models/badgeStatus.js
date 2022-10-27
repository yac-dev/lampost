import mongoose from 'mongoose';

const badgeStatusSchema = new mongoose.Schema({
  badge: {
    type: mongoose.Schema.ObjectId,
    ref: 'Badge',
  },
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
