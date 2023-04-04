import express from 'express';
const router = express.Router();
import { getBadges, getBadgesByRolls, getBadgeRolls, getIcons } from '../controllers/badges';

router.route('/').post(getBadges);
router.route('/rolls').get(getBadgesByRolls);
router.route('/icons').get(getIcons);

router.route('/:id/rolls').get(getBadgeRolls);

export default router;
