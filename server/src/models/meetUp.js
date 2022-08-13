import mongoose from 'mongoose';

const meetUpSchema = new mongoose.Schema({
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
  prerequisite: [String],
  fee: {
    type: String,
  },
  participants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  participantLimit: {
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

const MeetUp = mongoose.model('MeetUp', meetUpSchema);
export default MeetUp;
