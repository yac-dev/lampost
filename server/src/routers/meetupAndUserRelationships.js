import express from 'express';
const router = express.Router();
import {
  joinMeetup,
  leaveMeetup,
  getUserMeetups,
  getMeetupAttendees,
  getMeetup,
  updateViewedChatsLastTime,
  rsvp,
  checkRSVPState,
  sendStartNotification,
  sendFinishNotification,
  getUserMeetupsByYearMonth,
  getUserMeetupsByDate,
  getMyUpcomingMeetups,
} from '../controllers/meetupAndUserRelationships';

router.route('/join').post(joinMeetup);
router.route('/leave').post(leaveMeetup);
router.route('/meetup/:meetupId/user/:userId/viewedchatslasttime').patch(updateViewedChatsLastTime);
router.route('/meetup/:meetupId/user/:userId/rsvp').get(checkRSVPState).patch(rsvp);
router.route('/user/:userId').get(getUserMeetupsByYearMonth);
router.route('/user/:userId/date').get(getUserMeetupsByDate);
router.route('/meetup/:meetupId').get(getMeetup);
router.route('/meetup/:meetupId/users').get(getMeetupAttendees);
router.route('/meetup/startnotification').post(sendStartNotification);
router.route('/meetup/finishnotification').post(sendFinishNotification);
router.route('/meetup/patronnotification').post(sendFinishNotification);
router.route('/upcoming/user/:userId').get(getMyUpcomingMeetups);

export default router;
