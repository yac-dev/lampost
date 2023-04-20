import express from 'express';
const router = express.Router();
import {
  createFollowRelationship,
  sendMeetupLaunchNotificationToFollowers,
  isFollowing,
} from '../controllers/followRelationships';

router.route('/').post(createFollowRelationship);
router.route('/notification/meetup-launch').post(sendMeetupLaunchNotificationToFollowers);
router.route('/followee/:followeeId/follower/:followerId').get(isFollowing);
export default router;
