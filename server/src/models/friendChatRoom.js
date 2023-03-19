import mongoose from 'mongoose';

const friendChatRoomSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
});

const FriendChatRoom = mongoose.model('FriendChatRoom', friendChatRoomSchema);
export default FriendChatRoom;
