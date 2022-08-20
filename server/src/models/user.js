import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique: true,
  },
  lastName: {
    type: String,
    required: true,
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
  currentJob: {
    type: String,
  },
  // up to 3 items 一つ15字以下かな
  enthusiasms: [{ type: String }],
  // up to 3 items
  interestedGenre: [{ type: String }],
  // cityのschemaが必要になるな。気になる街よ、要は。
  oftenGoTo: {
    type: String,
  },
  skills: [
    {
      type: String,
    },
  ],
  // 120字にしようか
  bio: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
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

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

userSchema.methods.isPasswordCorrect = async (enteredPassword, actualPassword) => {
  return await bcrypt.compare(enteredPassword, actualPassword);
};

userSchema.virtual('posts', {
  ref: 'Post',
  foreignField: 'user',
  localField: '_id',
});

const User = mongoose.model('User', userSchema);
export default User;
