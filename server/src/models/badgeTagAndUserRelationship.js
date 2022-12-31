import mongoose from 'mongoose';

const badgeTagAndUserRelationshipSchema = new mongoose.Schema({
  badgeTag: {
    type: mongoose.Schema.ObjectId,
    ref: 'BadgeTag',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const BadgeTagAndUserRelationship = mongoose.model('BadgeTagAndUserRelationship', badgeTagAndUserRelationshipSchema);
export default BadgeTagAndUserRelationship;
