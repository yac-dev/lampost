import mongoose from 'mongoose';

const invitationSchema = new mongoose.Schema({
  type: String, // meetup, library or ports
  from: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  to: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // 自分向けのnotificationを
  },
  title: String,
  overview: String,
  message: String,
});

const Invitation = mongoose.model('Invitation', invitationSchema);
export default Invitation;
