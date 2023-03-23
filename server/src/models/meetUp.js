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
  agenda: String,
  isFeeFree: Boolean,
  fee: Number,
  feeDetail: String,
  isAttendeesLimitFree: Boolean,
  attendeesLimit: Number,
  meetupPointDetail: String,
  description: {
    type: String,
    maxLength: 500,
  },
  isPublic: Boolean,
  link: String,
  totalAttendees: Number,
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
  representation: {
    type: mongoose.Schema.ObjectId,
    ref: 'Impression',
  },
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
