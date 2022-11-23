import mongoose from 'mongoose';

const rollSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: String,
  createdAt: Date,
});

rollSchema.set('toJSON', { virtuals: true });
rollSchema.set('toObject', { virtuals: true });

rollSchema.virtual('assets', {
  ref: 'Asset',
  foreignField: 'roll',
  localField: '_id',
});

const Roll = mongoose.model('Roll', rollSchema);
export default Roll;
