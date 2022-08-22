import mongoose from 'mongoose';

const meetupGenreSchema = new mongoose.Schema({
  value: {
    type: String,
  },
  icon: {
    type: String,
  },
});

const MeetupGenre = mongoose.model('MeetupGenre', meetupGenreSchema);
export default MeetupGenre;
