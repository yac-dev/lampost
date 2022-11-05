import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  data: {
    type: String,
  },
  message: {
    type: String,
    maxLength: 40,
  },
  meetup: {
    type: mongoose.Schema.ObjectId,
    ref: 'Meetup',
  },
  badge: {
    type: mongoose.Schema.ObjectId,
    ref: 'Badge',
  },
  createdBy: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  creator: {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  createdAt: Date,
});

const Photo = mongoose.model('Photo', photoSchema);
export default Photo;
