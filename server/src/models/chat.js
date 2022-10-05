import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  // Write your timeline of your hobby!!
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
  createdAt: {
    type: Date,
  },
  // これは、chatにはいらねーや。portsでのchatでこれが必要になるとしよう。
  // type: {
  //   type: String,
  //   // enum: []  // generalかquestionかreplyかhelpかideaか。どれかになる。
  // },
});

const chat = mongoose.model('Chat', chatSchema);
export default chat;
