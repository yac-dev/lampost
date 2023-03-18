import mongoose from 'mongoose';

// meetupに参加をする。
// meetupのbadgeのidたちを使って、そのuserのbadgeAndUserRelationshipをqueryする。そのbadgeAndUserRelをidを使って、experienceのdocumentを作っていく感じだが。。。
const userBadgeExperienceSchema = new mongoose.Schema({
  badgeAndUserRelationship: {
    type: mongoose.Schema.ObjectId,
    ref: 'BadgeAndUserRelationship',
  },
  type: {
    type: String,
    enum: ['meetupLaunch', 'meetupRSVP', 'meetupImpression', 'clapped'],
  },
  experience: Number,
  createdAt: Date,
  // meetupLauncheなら+10, meetupRSVPなら+10、meetupImpressionなら+2で,でって感じかな。
});

const UserBadgeExperience = mongoose.model('UserBadgeExperience', userBadgeExperienceSchema);
export default UserBadgeExperience;
