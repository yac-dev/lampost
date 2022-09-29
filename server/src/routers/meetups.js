import express from 'express';
const router = express.Router();
import {
  createMeetup,
  getMeetups,
  joinMeetup,
  leaveMeetup,
  getUpcomingJoinedMeetups,
  getMeetup,
  getSelectedMeetup,
  getMeetupCrew,
} from '../controllers/meetups';

router.route('/upcoming/joined').post(getUpcomingJoinedMeetups);
router.route('/').post(createMeetup).get(getMeetups);
router.route('/:id').get(getMeetup);
router.route('/:id/crew').get(getMeetupCrew);
router.route('/:id/selected').get(getSelectedMeetup);
router.route('/:id/join').patch(joinMeetup);
router.route('/:id/leave').patch(leaveMeetup);

export default router;
