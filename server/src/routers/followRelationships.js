import express from 'express';
const router = express.Router();
import { createFollowRelationship, sendMeetupLaunchNotificationToFollowers } from '../controllers/followRelationships';

router.route('/').post(createFollowRelationship);
router.route('/notification/meetup-launch').post(sendMeetupLaunchNotificationToFollowers);
export default router;
