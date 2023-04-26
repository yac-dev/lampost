import mongoose from 'mongoose';

const badgeAndUserRelationshipSchema = new mongoose.Schema({
  badge: {
    type: mongoose.Schema.ObjectId,
    ref: 'Badge',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  badgeTags: [{ type: mongoose.Schema.ObjectId, ref: 'BadgeTag' }],
  badgeFriends: {
    emoji: String,
    title: String,
    users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  },
  badgeSnaps: {
    emoji: String,
    title: String,
    snaps: [{ type: mongoose.Schema.ObjectId, ref: 'Asset' }],
  },
  badgeLink: {
    title: String,
    type: String, // social mediaのtype youtube snapchat discord ...
    url: String,
  },
  createdAt: Date,
});

const BadgeAndUserRelationship = mongoose.model('BadgeAndUserRelationship', badgeAndUserRelationshipSchema);
export default BadgeAndUserRelationship;
