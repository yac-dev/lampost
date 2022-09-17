import mongoose from 'mongoose';

const meetupAgendaSchema = new mongoose.Schema({
  // JavaScript
  meetup: {
    type: mongoose.Schema.ObjectId,
    ref: 'Meetup',
  },
  title: {
    type: String,
  },
  from: {
    type: Date,
  },
  to: {
    type: Date,
  },
});

const meetupAgenda = mongoose.model('MeetupAgendaElement', meetupAgendaSchema);
export default meetupAgenda;
