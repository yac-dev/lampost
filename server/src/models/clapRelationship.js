import mongoose from 'mongoose';

// これはあくまで、badgeのpageでtagをpressしたらそのuserたちを全部fetchしてくるためにする。
const clapRelationshipSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  clapped: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  claps: {},
  createdAt: Date,
});

const ClapRelationship = mongoose.model('ClapRelationship', clapRelationshipSchema);
export default ClapRelationship;
