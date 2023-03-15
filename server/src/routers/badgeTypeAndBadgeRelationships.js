import express from 'express';
const router = express.Router();
import { getBadgesByType } from '../controllers/badgeTypeAndBadgeRelationships';

router.route('/:badgeTypeId').get(getBadgesByType);

export default router;
