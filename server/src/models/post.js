import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  // clientに表示するのはtagだが、backend上ではroll。。。んーーーー。なんか面倒くさいよな。tagとrollの中間に位置する言葉はない？？¥
  // どのような接着剤があるか。考えよう。
  roll: {
    type: String, // tagのschemaを作らなきゃいけない。
  },
  meetup: {
    type: mongoose.Schema.ObjectId,
    ref: 'Meetup',
  },
  comments: [
    {
      content: String,
      user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    },
  ],
  medias: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Media',
    },
  ],
  launcher: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
  },
});

const Post = mongoose.model('Post', postSchema);
export default Post;
