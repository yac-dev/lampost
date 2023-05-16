import mongoose from 'mongoose';

const loungeChatSchema = new mongoose.Schema({
  meetup: {
    type: mongoose.Schema.ObjectId,
    ref: 'Meetup',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  content: {
    type: Object, // string, binary data
  },
  imageUrl: String,
  replyTo: {
    // どのchat objectに対して付随するか、ってだけ。
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LoungeChat',
  },
  type: {
    type: String,
    enum: ['general', 'reply', 'question', 'help', 'image', 'edited'], // launchedは、portでのchat用ね。
  },
  createdAt: {
    type: Date,
  },
});

const LoungeChat = mongoose.model('LoungeChat', loungeChatSchema);
export default LoungeChat;
