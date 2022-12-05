import express from 'express';
const router = express.Router();
import { addBadgesToUser, getBadgesByUserId } from '../controllers/badgeAndUserRelationships';

router.route('/').post(addBadgesToUser);
router.route('/:userId').get(getBadgesByUserId);

export default router;
