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
  bio: {
    type: String,
    maxLength: 50,
    default: 'Just joined!',
  },
  badges: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'BadgeStatus',
    },
  ],
  upcomingMeetups: [
    {
      meetup: {
        type: mongoose.Schema.ObjectId,
        ref: 'Meetup',
      },
      viewedChatsLastTime: Date,
    },
  ],
  pastMeetups: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Meetup',
    },
  ],
  joinedLibraries: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Library',
    },
  ],
  connections: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Connection',
    },
    // {
    //   user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User',
    //   },
    //   chatRoom: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'ChatRoom',
    //   },
    //   viewedChatsLastTime: Date,
    // },
  ],
  createdAt: {
    type: Date,
  },
  // socials: [
  //   {
  //     name: String,
  //     url: String,
  //   },
  // ],
  // これ多分いらない。代わりにrelationshipのschemaが必要になる。
  // subscribed: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'User',
  //   },
  // ],
  // groupChats: [
  //   {
  //     chatRoom: {
  //       type: mongoose.Schema.ObjectId,
  //       ref: 'ChatRoom',
  //     },
  //     lastViewed: Date,
  //   },
  // ],
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
