import mongoose from 'mongoose';

const iconSchema = new mongoose.Schema({
  url: String,
  name: String,
});

const Icon = mongoose.model('Icon', iconSchema);
export default Icon;
