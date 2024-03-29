import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  // s3のlink先をこれに
  data: {
    type: String,
  },
  type: {
    type: String,
    // enums [photo or video]
  },
  meetup: {
    type: mongoose.Schema.ObjectId,
    ref: 'Meetup',
  },
  mood: {
    type: String,
  },
  // badges: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'Badge',
  //   },
  // ],
  place: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: [Number],
  },
  effect: String,
  duration: Number,
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  taggedPeople: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    default: [],
  },
  createdAt: Date,
});

const Asset = mongoose.model('Asset', assetSchema);
export default Asset;
