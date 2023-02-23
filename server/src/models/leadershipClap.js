import mongoose from 'mongoose';

const leadershipClapSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  launcher: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  claps: {
    teamManagement: Number,
    timeManagement: Number,
    planning: Number,
    courage: Number,
    integrity: Number,
    reliability: Number,
    creative: Number,
    flexibility: Number,
    communication: Number,
    relationshipBuilding: Number,
    mentoring: Number,
  },
  createdAt: Date,
});

const LeadershipClap = mongoose.model('LeadershipClap', leadershipClapSchema);
export default LeadershipClap;
