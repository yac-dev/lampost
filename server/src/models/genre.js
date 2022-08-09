import mongoose from 'mongoose';

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const Genre = mongoose.model('Genre', genreSchema);
export default Genre;
