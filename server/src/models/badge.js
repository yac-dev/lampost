import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const badgeSchema = new mongoose.Schema({
  icon: {
    type: mongoose.Schema.ObjectId,
    ref: 'Icon',
  },
  name: {
    type: String,
    unique: true,
    uniqueCaseInsensitive: true,
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

badgeSchema.plugin(uniqueValidator, { message: 'Name already exists.' });

const Badge = mongoose.model('Badge', badgeSchema);
export default Badge;
