import express from 'express';
const router = express.Router();
import {
  // addBadgesToUser,
  getBadgeDatasByUserId,
  addUserBadges,
  addBadgeTag,
  // getBadgeDetailByUserId,
  getBadgeHolders,
  // addBadgeTagsToUser,
  // addLinkToUser,
  getClapFriendBadgeDatasByUserId,
  clapBadge,
  growMyBadges,
} from '../controllers/badgeAndUserRelationships';

// router.route('/').post(addBadgesToUser);
// routerで(/11111)ってきたら、か。addからきたらまあ、こっちが反応するようになるか。
router.route('/:id/badgetag').post(addBadgeTag);
router.route('/:userId').get(getBadgeDatasByUserId).post(addUserBadges);
router.route('/:userId/clap').get(getClapFriendBadgeDatasByUserId).patch(clapBadge);
router.route('/:userId/grow').patch(growMyBadges);
router.route('/holders/:badgeId').get(getBadgeHolders);
// router.route('/add/:badgeId/:userId').patch(addBadgeTagsToUser);
// router.route('/link/:badgeId/:userId').patch(addLinkToUser);
// router.route('/:badgeId/:userId')

export default router;
