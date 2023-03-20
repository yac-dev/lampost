import express from 'express';
const router = express.Router();
import {
  createFriendChat,
  getFriendChatsByFriendChatRoomId,
  getUnreadFriendChats,
  updateUnreadToRead,
} from '../controllers/friendChats';

router.route('/').post(createFriendChat).patch(updateUnreadToRead);
router.route('/:friendChatRoomId').get(getFriendChatsByFriendChatRoomId);
router.route('/reciever/:recieverId').get(getUnreadFriendChats);

export default router;
