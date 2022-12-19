import mongoose from 'mongoose';

const reactionSchema = new mongoose.Schema({
  // 30字以内ね。commentは。そんでこれは、昨今のいわゆるhash tag化することになる。
  content: String,
});

const Reaction = mongoose.model('Reaction', reactionSchema);
export default Reaction;
