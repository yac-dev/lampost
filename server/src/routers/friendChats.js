import express from 'express';
const router = express.Router();
import { createFriendChat, getFriendChatsByFriendChatRoomId } from '../controllers/friendChats';

router.route('/').post(createFriendChat);
router.route('/:friendChatRoomId').get(getFriendChatsByFriendChatRoomId);

export default router;
