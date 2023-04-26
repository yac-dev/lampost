import mongoose from 'mongoose';

const badgeIndexSchema = new mongoose.Schema({
  title: {
    // my heros my favorite appsとかまあ色々。
    type: String,
  },
  userBadges: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'BadgeAndUserRelationship',
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: Date,
});

const BadgeIndex = mongoose.model('BadgeIndex', badgeIndexSchema);
export default BadgeIndex;
