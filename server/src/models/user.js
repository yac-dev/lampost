import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
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
  currentAddress: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: [Number],
  },
  photo: String,
  createdAt: {
    type: Date,
  },
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
