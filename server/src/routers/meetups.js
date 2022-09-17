import express from 'express';
const router = express.Router();
import { createMeetup, getMeetups, joinMeetup, getUpcomingJoinedMeetups } from '../controllers/meetups';

router.route('/upcoming/joined').get(getUpcomingJoinedMeetups);
router.route('/').post(createMeetup).get(getMeetups);
router.route('/:id/join').patch(joinMeetup);

export default router;
