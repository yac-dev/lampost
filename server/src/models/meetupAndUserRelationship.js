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
  viewedChatsLastTime: Date,
  // ここで、、、viewdchatslasttimeを持っておけばいいのかね。。。.
  // launcher: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User',
  // },
  // representation: String,
  // impressions: [
  //   {
  //     text: String,
  //     user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  //     createdAt: Date,
  //   },
  // ],
});

const MeetupAndUserRelationship = mongoose.model('MeetupAndUserRelationship', meetupAndUserRelationshipSchema);

export default MeetupAndUserRelationship;
