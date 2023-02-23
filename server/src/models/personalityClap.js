import mongoose from 'mongoose';

const personalityClapSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  clappedUser: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  claps: {
    considerate: String,
    communication: String,
    openMinded: String,
    spontaneous: String,
    diversity: String,
    passionate: String,
    hardWorking: String,
    concentration: String,
    calmAndRelaxed: String,
    respectful: String,
    teamWorking: String,
    adaptivity: String,
    criticalThinking: String,
  },
  createdAt: Date,
});

const PersonalityClap = mongoose.model('PersonalityClap', personalityClapSchema);
export default PersonalityClap;
