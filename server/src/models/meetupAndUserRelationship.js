import mongoose from 'mongoose';

const meetupAndUserRelationshipSchema = new mongoose.Schema({
  // 日付とbadgeとtitleだけqueryする感じかな。activitiesでは。stateもか。upcomingか過去か今か。
  meetup: {
    type: mongoose.Schema.ObjectId,
    ref: 'Meetup',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  rsvp: {
    type: Boolean,
    default: false,
  },
  launcher: Boolean,
  viewedChatsLastTime: Date,
});

const MeetupAndUserRelationship = mongoose.model('MeetupAndUserRelationship', meetupAndUserRelationshipSchema);

export default MeetupAndUserRelationship;
