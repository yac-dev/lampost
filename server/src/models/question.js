import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
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
  type: {
    type: mongoose.Schema.ObjectId,
    ref: 'PostType',
  },
  limit: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  views: {
    type: Number,
    default: 0,
  },
  isPublic: {
    type: Boolean,
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

const Question = mongoose.model('Question', questionSchema);
export default Question;
