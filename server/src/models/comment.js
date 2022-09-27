import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  meetup: {
    type: mongoose.Schema.ObjectId,
    ref: 'Meetup',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  content: String,
  reply: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment',
    },
  ],
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
