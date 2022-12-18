import express from 'express';
const router = express.Router();
import { getChatsByChatRoomId } from '../controllers/loungeCharAndChatRoomRelationships';

router.route('/:chatRoomId').get(getChatsByChatRoomId);

export default router;
