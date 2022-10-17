import mongoose from 'mongoose';

const badgeDetailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  badge: {
    type: mongoose.Schema.ObjectId,
    ref: 'Badge',
  },
  state: {
    type: String,
    // enums:[ 'plain', 'star' ]
  },
  totalVotes: Number,
  voters: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  detail: String,
  timeline: [],
});

const BadgeDetail = mongoose.model('BadgeDetail', badgeDetailSchema);
export default BadgeDetail;
