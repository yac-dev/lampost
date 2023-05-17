import mongoose from 'mongoose';

const reactionSchema = new mongoose.Schema({
  library: {
    type: mongoose.Schema.ObjectId,
    ref: 'Library',
  },
  icon: {
    //emotion iconっていうのがまた別で必要になるかもな。。。
    type: mongoose.Schema.ObjectId,
    ref: 'Icon',
  },
  iconType: String, // emoji or reactionIcon
  emoji: String, //　だから、emojiを使うか、iconを使うか、そのどちらかになる。
  reactionIcon: {
    type: mongoose.Schema.ObjectId,
    ref: 'ReactionIcon',
  },
  comment: {
    type: String,
    maxLength: 15,
  },
  color: String,
});

const Reaction = mongoose.model('Reaction', reactionSchema);
export default Reaction;
