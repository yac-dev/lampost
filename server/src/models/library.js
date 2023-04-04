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
  ], // requiredPassion Numberって感じか。多分。
  // passionを高く設定していたら、そこのlibraryには貢献度の高い人のみが入れる、ってなるよな。それは面白いかも。ただ、これは後でいいかもな。
  description: String,
  launcher: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  thumbnail: {
    type: mongoose.Schema.ObjectId,
    ref: 'Asset',
  },
  assetType: String, //['video', 'photo', 'videoAndPhoto']
  isReactionAvailable: Boolean,
  isCommentAvailable: Boolean,
  reactions: [],
  albums: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Album',
    },
  ],
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
