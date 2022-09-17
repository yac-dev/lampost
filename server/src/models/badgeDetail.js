import mongoose from 'mongoose';

const badgeDetailSchema = new mongoose.Schema({
  // Write your timeline of your hobby!!
  badge: {
    type: mongoose.Schema.ObjectId,
    ref: 'Badge',
  },
  title: {
    type: String,
  },
  when: {
    type: Date,
  },
  detail: {
    type: String,
    // ここで、social mediaのlinkを埋め込んで見せられるようにしたいね。
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const badgeDetail = mongoose.model('BadgeDetail', badgeDetailSchema);
export default badgeDetail;
