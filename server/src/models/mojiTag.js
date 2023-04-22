import mongoose from 'mongoose';

const mojiTagSchema = new mongoose.Schema({
  emoji: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: Date,
});

const MojiTag = mongoose.model('MojiTag', mojiTagSchema);
export default MojiTag;
