import mongoose from 'mongoose';

const friendRelationshipSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  friend: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  friendChatRoom: {
    type: mongoose.Schema.ObjectId,
    ref: 'FriendChatRoom',
  },
  createdAt: {
    type: Date,
  },
});

const FriendRelationship = mongoose.model('FriendRelationship', friendRelationshipSchema);
export default FriendRelationship;
