import mongoose from 'mongoose';

const friendChatSchema = new mongoose.Schema({
  friendChatRoom: {
    type: mongoose.Schema.ObjectId,
    ref: 'FriendChatRoom',
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  }, //この、userっていうfieldいらないかもな。。。user schemaのarrayに直接、入れるからね。
  reciever: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  type: {
    type: String, // textか写真、動画ね。
    enum: ['text', 'binary'],
  },
  content: String,
  isRead: Boolean,
  createdAt: Date,
});

const FriendChat = mongoose.model('FriendChat', friendChatSchema);
export default FriendChat;
