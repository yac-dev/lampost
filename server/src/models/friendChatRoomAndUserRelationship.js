import mongoose from 'mongoose';

const friendChatRoomAndUserRelationshipSchema = new mongoose.Schema({
  friendChatRoom: {
    type: mongoose.Schema.ObjectId,
    ref: 'FriendChatRoom',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const FriendChatRoomAndUserRelationship = mongoose.model(
  'FriendChatRoomAndUserRelationship',
  friendChatRoomAndUserRelationshipSchema
);
export default FriendChatRoomAndUserRelationship;
