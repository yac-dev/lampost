import express from 'express';
const router = express.Router();
import {
  joinMeetup,
  leaveMeetup,
  getUserMeetups,
  getMeetupAttendees,
  getMeetup,
} from '../controllers/meetupAndUserRelationships';

router.route('/join').post(joinMeetup);
router.route('/leave').post(leaveMeetup);
router.route('/user/:userId').get(getUserMeetups);
router.route('/meetup/:meetupId').get(getMeetup);
router.route('/meetup/:meetupId/users').get(getMeetupAttendees);

export default router;
