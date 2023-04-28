import express from 'express';
const router = express.Router();
import { getBadges, getBadgesByRolls, getBadgeRolls, getIcons, createBadge } from '../controllers/badges';

router.route('/').post(createBadge);
router.route('/rolls').get(getBadgesByRolls);
router.route('/icons').get(getIcons);

router.route('/:id/rolls').get(getBadgeRolls);

export default router;
