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
  startDateAndTime: {
    type: Date,
  },
  isStartDateAndTimeUpdated: {
    type: Boolean,
  },
  endDateAndTime: {
    type: Date,
  },
  isEndDateAndTimeUpdated: {
    type: Boolean,
  },
  fee: {
    type: Number,
  },
  currency: {
    type: String,
  },
  attendeesLimit: {
    type: Number,
  },
  description: {
    type: String,
    maxLength: 300,
  },
  agenda: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'MeetupAgenda', // agendaのdocumentがqueueで溜まっていく感じ。
    },
    // {meetup: '20391390138', title: 'eat', from:'3/15/2022 16:00', to: '3/15/2022 17:00' }みたいな感じかね。ただ、これは最後でいいし、そもそも必要かも分からん。
  ],
  isPublic: {
    type: Boolean,
  },
  // hostが入力するのはここまで
  host: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
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
  state: {
    type: String,
    default: '',
    // '', started, done
  },
  numberOfComments: {
    type: Number,
  },
  chats: [],
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

// function genresLimit(val) {
//   return val.length <= 3;
// }

// function attendeesLimit(val) {
//   return val.length <= 7;
// }

meetupSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'meetup',
  localField: '_id',
});

const Meetup = mongoose.model('Meetup', meetupSchema);
export default Meetup;
