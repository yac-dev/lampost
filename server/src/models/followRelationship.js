import mongoose from 'mongoose';

const followRelationshipSchema = new mongoose.Schema({
  followee: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  follower: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: Date,
});

const FollowRelationship = mongoose.model('FollowRelationship', followRelationshipSchema);
export default FollowRelationship;
