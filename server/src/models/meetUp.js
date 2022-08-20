import mongoose from 'mongoose';

const meetupSchema = new mongoose.Schema({
  // max80字ね。
  place: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: [Number],
  },
  title: {
    type: String,
  },
  // 最大で3つまで
  genres: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'PostType',
    },
  ],
  startDateAndTime: {
    type: Date,
  },
  endDateAndTime: {
    type: Date,
  },
  fee: {
    type: String,
  },
  isPublic: {
    type: Boolean,
  },
  // hostが入力するのはここまで！
  host: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  // limitは8!!
  attendees: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
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
  createdAt: {
    type: Date,
  },
});

const Meetup = mongoose.model('Meetup', meetupSchema);
export default Meetup;
