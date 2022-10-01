import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  // Write your timeline of your hobby!!
  meetup: {
    type: mongoose.Schema.ObjectId,
    ref: 'Meetup',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
  },
  type: {
    type: String,
    // enum: []  // generalかquestionかreplyかhelpかideaか。どれかになる。
  },
  reply: {
    // どのchat objectに対して付随するか、ってだけ。
    type: mongoose.Schema.ObjectId,
    ref: 'Chat',
  },
  createdAt: {
    type: Date,
  },
});

const chat = mongoose.model('Chat', chatSchema);
export default chat;
