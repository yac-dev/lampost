import mongoose from 'mongoose';

const badgeTypeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  total: {
    type: Number,
  },
});

const BadgeType = mongoose.model('BadgeType', badgeTypeSchema);
export default BadgeType;
