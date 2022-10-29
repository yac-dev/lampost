import express from 'express';
const router = express.Router();
import { getBadgeStatus } from '../controllers/badgeStatuses';

router.route('/:id').get(getBadgeStatus);

export default router;
