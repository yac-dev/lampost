import mongoose from 'mongoose';

// これはあくまで、badgeのpageでtagをpressしたらそのuserたちを全部fetchしてくるためにする。
const praiseRelationshipSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  launcher: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  praises: {},
  createdAt: Date,
});

const PraiseRelationship = mongoose.model('PraiseRelationship', praiseRelationshipSchema);
export default PraiseRelationship;
