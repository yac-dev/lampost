import mongoose from 'mongoose';

const badgeStatusSchema = new mongoose.Schema({
  badge: {
    type: mongoose.Schema.ObjectId,
    ref: 'Badge',
  },
  state: {
    type: String,
    enum: ['plain', 'star'],
  },
  totalVotes: Number,
  voters: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  detail: String,
  // timeline: [],
});

const BadgeStatus = mongoose.model('BadgeStatus', badgeStatusSchema);
export default BadgeStatus;
