import mongoose from 'mongoose';

const reactionSchema = new mongoose.Schema({
  library: {
    type: mongoose.Schema.ObjectId,
    ref: 'Library',
  },
  icon: {
    type: mongoose.Schema.ObjectId,
    ref: 'Icon',
  },
  comment: {
    type: String,
    maxLength: 15,
  },
  color: String,
});

const Reaction = mongoose.model('Reaction', reactionSchema);
export default Reaction;
