import mongoose from 'mongoose';

const iconTypeSchema = new mongoose.Schema({
  name: String,
  total: Number,
});

const IconType = mongoose.model('IconType', iconTypeSchema);
export default IconType;

// だから、badge側もicon fieldで、このiconを参照する形にしないといけないな。
// そう、だからiconの名前を使って、そのままbadgeを作れば胃い。それだと一発でできる。
