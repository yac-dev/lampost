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
  badges: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Badge',
    },
  ],
  title: {
    type: String,
    maxLength: 40,
  },
  startDateAndTime: Date,
  duration: Number,
  applicationDeadline: Date,
  isFeeFree: Boolean,
  fee: Number,
  currency: String,
  isAttendeesLimitFree: Boolean,
  attendeesLimit: Number,
  description: {
    type: String,
    maxLength: 350,
  },
  isPublic: Boolean,
  isMediaAllowed: Boolean,
  link: String,
  totalAttendees: Number,
  totalComments: Number,
  totalAssets: Number,
  totalImpressions: Number,
  topPhotos: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Asset',
    },
  ],
  // attendees: {
  //   type: [
  //     {
  //       type: mongoose.Schema.ObjectId,
  //       ref: 'User',
  //     },
  //   ],
  //   // validate: [attendeesLimit, 'OOPS! This meetup is full now.'],
  // },
  launcher: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  state: {
    type: String,
    default: '', // 'upcoming', 'ongoing', 'finished'
  },
  createdAt: {
    type: Date,
  },
  representation: String,
});

// function genresLimit(val) {
//   return val.length <= 3;
// }

// function attendeesLimit(val) {
//   return val.length <= 7;
// }

// meetupSchema.virtual('comments', {
//   ref: 'Comment',
//   foreignField: 'meetup',
//   localField: '_id',
// });

const Meetup = mongoose.model('Meetup', meetupSchema);
export default Meetup;
