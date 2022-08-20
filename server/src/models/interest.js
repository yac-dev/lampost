import mongoose from 'mongoose';

const InterestSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const Interest = mongoose.model('Interest', InterestSchema);
export default Interest;
