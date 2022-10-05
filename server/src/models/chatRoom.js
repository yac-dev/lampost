import mongoose from 'mongoose';

const chatRoomSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
  },
});

// virtualで、chatのarrayを持つ。

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
export default ChatRoom;
