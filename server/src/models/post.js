import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  pics: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Pic',
    },
  ],
  genre: {
    // type: mongoose.Schema.ObjectId,
    // ref: 'Genre',
    type: String,
  },
  limit: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  place: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: [Number],
  },
  createdAt: {
    type: Date,
  },
});

const Post = mongoose.model('Post', postSchema);
export default Post;
