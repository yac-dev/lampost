import express from 'express';
const router = express.Router();
import {
  // getMyLoungeStatus,
  getSelectedMeetupLoungeChats,
  getUnreadLoungeChats,
  createLoungeChat,
  sendImage,
} from '../controllers/loungeChats';
import multerForLoungeChatImages from '../middlewares/multerForLoungeChatImages';

router.route('/').post(createLoungeChat);
router.route('/image').post(multerForLoungeChatImages.single('loungeChatImage'), sendImage);
router.route('/:meetupId').get(getSelectedMeetupLoungeChats);
router.route('/unreadchats').post(getUnreadLoungeChats);

export default router;
