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
});

const Badge = mongoose.model('BadgeElement', badgeSchema);
export default Badge;
