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
      url: String, // ここさ、urlの方がいいのかね。。。それとも、mobile appへ遷移させるか。まあ、後でいいや。
    },
  ],
  upcomingJoinedMeetups: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Meetup',
    },
  ],
  upcomingLaunchedMeetups: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Meetup',
    },
  ],
  createdAt: {
    type: Date,
  },
  // ここから下はサイズが大きくなる。
  subscribed: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
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
  connections: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  // address: {
  //   type: {
  //     type: String,
  //     enum: ['Point'],
  //     default: 'Point',
  //   },
  //   coordinates: [Number],
  // },
  // // languageのschemaを入れるか後で。
  // languages: [
  //   {
  //     type: String
  //   }
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
