import mongoose from 'mongoose';

const librarySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  badges: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Badge',
    },
  ], // requiredPassion Numberって感じか。多分。
  // passionを高く設定していたら、そこのlibraryには貢献度の高い人のみが入れる、ってなるよな。それは面白いかも。ただ、これは後でいいかもな。
  launcher: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  thumbnail: {
    type: mongoose.Schema.ObjectId,
    ref: 'Asset',
  },
  isReactionAvailable: Boolean,
  assetType: String, //['video', 'photo', 'videoAndPhoto']
  isCommentAvailable: Boolean,
  description: String,
  reactions: [],
  albums: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Album',
    },
  ],
  isPublic: Boolean,
  color: String,
  totalAssets: Number,
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
