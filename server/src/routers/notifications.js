import express from 'express';
const router = express.Router();
import { getNotifications } from '../controllers/notifications';

router.route('/:userId').get(getNotifications);

export default router;
