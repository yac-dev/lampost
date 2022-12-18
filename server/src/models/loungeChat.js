import mongoose from 'mongoose';

const loungeChatSchema = new mongoose.Schema({
  chatRoom: {
    type: mongoose.Schema.ObjectId,
    ref: 'ChatRoom',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  content: {
    type: Object, // string, binary data
  },
  replyTo: {
    // どのchat objectに対して付随するか、ってだけ。
    type: mongoose.Schema.ObjectId,
    ref: 'Chat',
  },
  type: {
    type: String,
    enum: ['general', 'reply', 'idea', 'questionOrHelp', 'announcement'], // launchedは、portでのchat用ね。
  },
  createdAt: {
    type: Date,
  },
});

const LoungeChat = mongoose.model('LoungeChat', loungeChatSchema);
export default LoungeChat;
