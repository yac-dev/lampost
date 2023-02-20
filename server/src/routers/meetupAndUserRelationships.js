import express from 'express';
const router = express.Router();
import { joinMeetup, leaveMeetup } from '../controllers/meetupAndUserRelationships';

router.route('/join').post(joinMeetup);
router.route('/leave').post(leaveMeetup);

export default router;
