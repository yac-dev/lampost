import mongoose from 'mongoose';

const friendChatSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  }, //この、userっていうfieldいらないかもな。。。user schemaのarrayに直接、入れるからね。
  reciever: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  content: String,
  isRead: Boolean,
  // chatRoom: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'ChatRoom',
  // },
});

const FriendChat = mongoose.model('FriendChat', friendChatSchema);
export default FriendChat;
