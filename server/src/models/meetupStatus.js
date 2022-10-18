import mongoose from 'mongoose';

const meetupStatusSchema = new mongoose.Schema({
  meetup: {
    type: mongoose.Schema.ObjectId,
    ref: 'Meeetup',
  },
  launched: Boolean,
  viewedChatsLastTime: Date,
});

const MeetupStatus = mongoose.model('MeetupStatus', meetupStatusSchema);
export default MeetupStatus;
