import express from 'express';
const router = express.Router();
import { reportMeetup, reportMeetupMember } from '../controllers/reports';

router.route('/meetupanduser').post(reportMeetup);
router.route('/meetupmember').post(reportMeetupMember);

export default router;
