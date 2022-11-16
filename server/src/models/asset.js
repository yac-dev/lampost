import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  roll: {
    type: mongoose.Schema.ObjectId,
    ref: 'Roll',
  },
  // s3のlink先をこれに
  data: {
    type: String,
  },
  message: {
    type: String,
    maxLength: 40,
  },
  meetup: {
    type: mongoose.Schema.ObjectId,
    ref: 'Meetup',
  },
  createdBy: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: Date,
});

const Asset = mongoose.model('Asset', assetSchema);
export default Asset;
