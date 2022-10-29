import express from 'express';
const router = express.Router();
import { getUserBadgeStatus } from '../controllers/badgeStatuses';

router.route('/').post(getUserBadgeStatus);

export default router;
