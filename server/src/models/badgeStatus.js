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
