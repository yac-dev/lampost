import mongoose from 'mongoose';

const badgeTagSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 20,
  },
  badge: {
    type: mongoose.Schema.ObjectId,
    ref: 'Badge',
  },
  totalHolders: Number,
});

const BadgeTag = mongoose.model('BadgeTag', badgeTagSchema);
export default BadgeTag;
