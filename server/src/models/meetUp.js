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
  isPublic: {
    type: Boolean,
  },
  // hostが入力するのはここまで
  host: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  // limitは7!!
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
