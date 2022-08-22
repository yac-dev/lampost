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
  // genres: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'MeetupGenre',
  //   },
  // ],
  genres: [String],
  startDateAndTime: {
    type: Date,
  },
  endDateAndTime: {
    type: Date,
  },
  // 0 or > 0になる
  fee: {
    type: Number,
  },
  // usd, gbp, jpy等
  currency: {
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
  state: {
    type: String,
    default: '',
    // '', started, done
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
  createdAt: {
    type: Date,
  },
});

const Meetup = mongoose.model('Meetup', meetupSchema);
export default Meetup;
