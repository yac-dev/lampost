import mongoose from 'mongoose';

const postTypeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const PostType = mongoose.model('PostType', postTypeSchema);
export default PostType;
