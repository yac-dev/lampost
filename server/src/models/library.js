import mongoose from 'mongoose';

const librarySchema = new mongoose.Schema({
  // rollっていうのは、sharedなalbumのことな。
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
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: Date,
});

// このlibraryに紐づくalbumがいくともある感じになる。
// rolls [{type: roll schema, ref: 'roll'}] ってこと。
librarySchema.set('toJSON', { virtuals: true });
librarySchema.set('toObject', { virtuals: true });

librarySchema.virtual('rolls', {
  ref: 'Roll',
  foreignField: 'library',
  localField: '_id',
});

const Library = mongoose.model('Library', librarySchema);
export default Library;
