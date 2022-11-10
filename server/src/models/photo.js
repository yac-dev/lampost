import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
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
  // launcherがrollを作ったらphotosは全て、そのrollのidになる。
  roll: {
    type: mongoose.Schema.ObjectId,
    ref: 'Roll',
  },
  createdAt: Date,
});

const Photo = mongoose.model('Photo', photoSchema);
export default Photo;
