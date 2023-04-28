import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  icon: {
    type: mongoose.Schema.ObjectId,
    ref: 'Icon',
  },
  name: {
    type: String,
    unique: true,
  },
  color: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: Date,
});

// badgeSchema.set('toJSON', { virtuals: true });
// badgeSchema.set('toObject', { virtuals: true });

const Badge = mongoose.model('Badge', badgeSchema);
export default Badge;
