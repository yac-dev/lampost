import mongoose from 'mongoose';

const meetupSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  fee: {
    type: String,
  },
  attendees: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  attendeesLimit: {
    type: Number,
  },
  pics: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Pic',
    },
  ],
  videos: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Video',
    },
  ],
  type: {
    type: mongoose.Schema.ObjectId,
    ref: 'PostType',
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

const Meetup = mongoose.model('Meetup', meetupSchema);
export default Meetup;
