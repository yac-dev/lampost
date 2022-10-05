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
  },
  skills: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Badge',
    },
  ],
  badges: [
    {
      badge: {
        type: mongoose.Schema.ObjectId,
        ref: 'Badge',
      },
      detail: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'BadgeDetail',
        },
      ],
    },
  ],
  socials: [
    {
      name: String,
      url: String,
    },
  ],
  upcomingJoinedMeetups: [
    {
      meetup: {
        type: mongoose.Schema.ObjectId,
        ref: 'Meetup',
      },
      viewedChatsLastTime: Date,
    },
  ],
  upcomingLaunchedMeetups: [
    {
      meetup: {
        type: mongoose.Schema.ObjectId,
        ref: 'Meetup',
      },
      viewedChatsLastTime: Date,
    },
  ],
  createdAt: {
    type: Date,
  },
  pastLaunchedMeetups: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Meetup',
    },
  ],
  pastJoinedMeetups: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Meetup',
    },
  ],
  totalConnections: Number,
  connections: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
      chatRoom: {
        type: mongoose.Schema.ObjectId,
        ref: 'ChatRoom',
      },
      viewedChatsLastTime: Date,
    },
  ],
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
