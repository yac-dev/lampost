import express from 'express';
const router = express.Router();
// import { createQuestion, createReply } from '../controllers/comments';
import { createChat, replyChat } from '../controllers/chats';

router.route('/').post(createChat);
router.route('/:id/reply').post(replyChat);

export default router;
