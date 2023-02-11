import express from 'express';
const router = express.Router();
import { reportMeetup, reportMeetupMember, reportUser } from '../controllers/reports';

router.route('/meetupanduser').post(reportMeetup);
router.route('/meetupmember').post(reportMeetupMember);
router.route('/user').post(reportUser);

export default router;
