import express from 'express';
const router = express.Router();
import {
  addBadgesToUser,
  getBadgeDatasByUserId,
  // getBadgeDetailByUserId,
  getBadgeHolders,
} from '../controllers/badgeAndUserRelationships';

// router.route('/').post(addBadgesToUser);
router.route('/:userId').get(getBadgeDatasByUserId).post(addBadgesToUser);
router.route('/holders/:badgeId').get(getBadgeHolders);
// router.route('/:badgeId/:userId')

export default router;
