import mongoose from 'mongoose';

const reactionIconSchema = new mongoose.Schema({
  url: String, // ここは,awsのurlが入ることになる。
  name: String,
});

const ReactionIcon = mongoose.model('ReactionIcon', reactionIconSchema);
export default ReactionIcon;
