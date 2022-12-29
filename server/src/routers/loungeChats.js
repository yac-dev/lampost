import express from 'express';
const router = express.Router();
import { getMyLoungeChats } from '../controllers/loungeChats';

router.route('/').post(getMyLoungeChats);

export default router;
