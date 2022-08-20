import mongoose from 'mongoose';

const meetupSchema = new mongoose.Schema({
  place: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: [Number],
  },
  title: {
    // max80字ね。
    type: String,
    maxLength: 80,
  },
  // 最大で3つまで
  interests: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Interest',
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
  // limitは7!!
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
