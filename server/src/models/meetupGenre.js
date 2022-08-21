import mongoose from 'mongoose';

const meetupGenreSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const MeetupGenre = mongoose.model('MeetupGenre', meetupGenreSchema);
export default MeetupGenre;
