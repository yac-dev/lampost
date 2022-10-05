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
  isStartDateAndTimeUpdated: Boolean,
  endDateAndTime: Date,
  isEndDateAndTimeUpdated: Boolean,
  isFeeFree: Boolean,
  fee: Number,
  currency: String,
  isAttendeesLimitFree: Boolean,
  attendeesLimit: Number,
  description: {
    type: String,
    maxLength: 300,
  },
  isPublic: Boolean,
  totalComments: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment',
    },
  ],
  totalImpressions: {
    type: Number,
    default: 0,
  },
  launcher: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  totalAttendees: {
    type: Number,
    default: 0,
  },
  attendees: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    // validate: [attendeesLimit, 'OOPS! This meetup is full now.'],
  },
  chatRoom: {
    type: mongoose.Schema.ObjectId,
    ref: 'ChatRoom',
  },
  state: {
    type: String,
    default: '', // '', started, done
  },
  createdAt: {
    type: Date,
  },
  // これも、commentをただ集めてくればいいだよな,
  // agenda: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'MeetupAgenda', // agendaのdocumentがqueueで溜まっていく感じ。
  //   },
  //   // {meetup: '20391390138', title: 'eat', from:'3/15/2022 16:00', to: '3/15/2022 17:00' }みたいな感じかね。ただ、これは最後でいいし、そもそも必要かも分からん。
  // ],
  // impressions: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'Impression',
  //   },
  // ], これも多分いらない。impression側でmeetupのidあれば十分。
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
