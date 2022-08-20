import express from 'express';
const router = express.Router();
import { createMeetup } from '../controllers/meetups';

router.route('/').post(createMeetup);
// .get(getPosts);

export default router;
