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
  replyTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'Comment',
  },
  createdAt: {
    type: Date,
  },
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
