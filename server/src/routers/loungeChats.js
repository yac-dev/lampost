import express from 'express';
const router = express.Router();
import { getMyLoungeStatus, getSelectedMeetupLoungeChats, getUnreadLoungeChats } from '../controllers/loungeChats';

router.route('/').post(getMyLoungeStatus);
router.route('/:meetupId').get(getSelectedMeetupLoungeChats);
router.route('/unreadchats').post(getUnreadLoungeChats);

export default router;
