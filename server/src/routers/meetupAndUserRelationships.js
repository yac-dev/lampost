import express from 'express';
const router = express.Router();
import {
  joinMeetup,
  leaveMeetup,
  getUserMeetups,
  getMeetupAttendees,
  getMeetup,
  updateViewedChatsLastTime,
} from '../controllers/meetupAndUserRelationships';

router.route('/join').post(joinMeetup);
router.route('/leave').post(leaveMeetup);
router.route('/meetup/:meetupId/user/:userId/viewedchatslasttime').patch(updateViewedChatsLastTime);
router.route('/user/:userId').get(getUserMeetups);
router.route('/meetup/:meetupId').get(getMeetup);
router.route('/meetup/:meetupId/users').get(getMeetupAttendees);

export default router;
