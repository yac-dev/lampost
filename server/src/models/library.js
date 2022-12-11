import mongoose from 'mongoose';

const librarySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  badges: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Badge',
    },
  ],
  description: String,
  rolls: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Roll',
    },
  ],
  launcher: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  totalMembers: Number,
  rate: Number,
  createdAt: Date,
});

// このlibraryに紐づくalbumがいくともある感じになる。
// rolls [{type: roll schema, ref: 'roll'}] ってこと。
librarySchema.set('toJSON', { virtuals: true });
librarySchema.set('toObject', { virtuals: true });

// librarySchema.virtual('members', {
//   ref: 'User',
//   foreignField: 'libraries',
//   localField: '_id'
// })

const Library = mongoose.model('Library', librarySchema);
export default Library;
