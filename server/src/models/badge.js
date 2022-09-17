import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  // JavaScript
  label: {
    type: String,
  },
  // tech
  type: {
    type: String,
  },
  color: {
    type: String,
  },
  value: {
    type: String,
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const Badge = mongoose.model('Badge', badgeSchema);
export default Badge;
