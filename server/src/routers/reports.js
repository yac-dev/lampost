import express from 'express';
const router = express.Router();
import { reportMeetup } from '../controllers/reports';

router.route('/meetupanduser').post(reportMeetup);

export default router;
