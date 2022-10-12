import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
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
    enum: ['general', 'idea', 'questionOrHelp', 'announcement', 'lamnched'], // launchedは、portでのchat用ね。
  },
  createdAt: {
    type: Date,
  },
  // これは、chatにはいらねーや。portsでのchatでこれが必要になるとしよう。
  // type: {
  //   type: String,
  //   // enum: []  // generalかquestionかreplyかhelpかideaか。どれかになる。→replyはいらないや。
  // },
});

const chat = mongoose.model('Chat', chatSchema);
export default chat;
