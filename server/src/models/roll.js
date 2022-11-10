import mongoose from 'mongoose';

const rollSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  badge: {
    type: mongoose.Schema.ObjectId,
    ref: 'Badge',
  },
});

rollSchema.set('toJSON', { virtuals: true });
rollSchema.set('toObject', { virtuals: true });

rollSchema.virtual('photos', {
  ref: 'Photo',
  foreignField: 'roll',
  localField: '_id',
});

const Roll = mongoose.model('Roll', rollSchema);
export default Roll;
