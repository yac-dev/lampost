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

chatRoomSchema.set('toJSON', { virtuals: true });
chatRoomSchema.set('toObject', { virtuals: true });

chatRoomSchema.virtual('chats', {
  ref: 'Chat',
  foreignField: 'chatRoom',
  localField: '_id',
});

// virtualで、chatのarrayを持つ。

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
export default ChatRoom;
