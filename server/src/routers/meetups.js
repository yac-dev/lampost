import express from 'express';
const router = express.Router();
import {
  createMeetup,
  getMeetups,
  joinMeetup,
  getUpcomingJoinedMeetups,
  getMeetup,
  getSelectedMeetup,
} from '../controllers/meetups';

router.route('/upcoming/joined').post(getUpcomingJoinedMeetups);
router.route('/').post(createMeetup).get(getMeetups);
router.route('/:id').get(getMeetup);
router.route('/:id/selected').get(getSelectedMeetup);
router.route('/:id/join').patch(joinMeetup);

export default router;
