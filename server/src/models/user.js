import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  isInMeetup: {
    type: Boolean,
    default: false,
  },
  upcomingMeetups: [
    {
      meetup: {
        type: mongoose.Schema.ObjectId,
        ref: 'Meetup',
      },
      viewedChatsLastTime: Date,
    },
  ],
  statsOverview: {
    totalLaunched: {
      type: Number,
      default: 0,
    },
    totalPatrons: {
      type: Number,
      default: 0,
    },
    totalAssets: {
      type: Number,
      default: 0,
    },
    totalFriends: {
      type: Number,
      default: 0,
    },
    totalLogs: {
      type: Number,
      default: 0,
    },
  },
  createdAt: {
    type: Date,
  },
});

function arrayLimit(val) {
  return val.length <= 3;
}

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

userSchema.methods.isPasswordCorrect = async (enteredPassword, actualPassword) => {
  return await bcrypt.compare(enteredPassword, actualPassword);
};

// virtualで、subscribersを用意しないといかんな。

// userSchema.virtual('joinedMeetups', {
//   ref: 'Meetup',
//   foreignField: 'users',
//   localField: '_id',
// });

// userSchema.virtual('meetups', {
//   ref: 'Meetup',
//   foreignField: 'host',
//   localField: '_id',
// });

// userSchema.virtual('meetups', {
//   ref: 'Meetup',
//   foreignField: 'attendees',
//   localField: '_id',
// });

const User = mongoose.model('User', userSchema);
export default User;
