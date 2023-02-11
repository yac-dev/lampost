import express from 'express';
const router = express.Router();
import { reportMeetup, reportMeetupMember, reportUser, reportAsset } from '../controllers/reports';

router.route('/meetupanduser').post(reportMeetup);
router.route('/meetupmember').post(reportMeetupMember);
router.route('/user').post(reportUser);
router.route('/asset').post(reportAsset);

export default router;
