import express from 'express';
const router = express.Router();
import { createMeetup, getMeetups } from '../controllers/meetups';

router.route('/').post(createMeetup).get(getMeetups);
// .get(getPosts);

export default router;
