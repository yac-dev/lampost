import express from 'express';
const router = express.Router();
import { getBadgeIndexes } from '../controllers/badgeIndexes';

router.route('/:userId').get(getBadgeIndexes);

export default router;
