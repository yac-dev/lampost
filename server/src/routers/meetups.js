import express from 'express';
const router = express.Router();
import {
  createMeetup,
  getMeetups,
  joinMeetup,
  leaveMeetup,
  getUpcomingMeetups,
  getMeetup,
  getSelectedMeetup,
  getMeetupComments,
  getMeetupCrew,
  startMeetup,
  finishMeetup,
  getMyMeetupStates,
  checkIsMeetupOngoing,
  updateMeetup,
} from '../controllers/meetups';

router.route('/upcoming').post(getUpcomingMeetups);
router.route('/').post(createMeetup).get(getMeetups);
router.route('/:id').get(getMeetup).patch(updateMeetup);
router.route('/:id/isongoing').get(checkIsMeetupOngoing);
router.route('/:id/crew').get(getMeetupCrew);
router.route('/:id/selected').get(getSelectedMeetup);
router.route('/:id/comments').get(getMeetupComments);
router.route('/:id/join').patch(joinMeetup);
router.route('/:id/leave').patch(leaveMeetup);
router.route('/:id/start').patch(startMeetup);
router.route('/:id/finish').patch(finishMeetup);
router.route('/mymeetupstates').post(getMyMeetupStates);

export default router;
