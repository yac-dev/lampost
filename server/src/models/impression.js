import mongoose from 'mongoose';

const impressionSchema = mongoose.Schema({
  meetup: {
    type: mongoose.Schema.ObjectId,
    ref: 'Meetup',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  emojis: [String],
  content: String,
  createdAt: {
    type: Date,
  },
});

const Impression = mongoose.model('Impression', impressionSchema);
export default Impression;
