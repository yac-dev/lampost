import express from 'express';
const router = express.Router();
import { createQuestion, createReply, getMeetupComments } from '../controllers/comments';

router.route('/').post(createQuestion);
router.route('/:meetupId').get(getMeetupComments);
// router.route('/:id/reply').post(createReply);

export default router;
