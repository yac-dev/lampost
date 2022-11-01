import mongoose from 'mongoose';

const tagStatusSchema = new mongoose.Schema({
  badge: {
    type: mongoose.Schema.ObjectId,
    ref: 'Badge',
  }, // badgeにbadgeをつけているだけだからな。単純に。
});

const Tag = mongoose.model('Tag', tagSchema);
export default Tag;
