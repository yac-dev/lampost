import express from 'express';
const router = express.Router();
import {
  getBadges,
  getBadgesByRolls,
  getBadgeRolls,
  getIcons,
  createBadge,
  createIconPreview,
  createIconFromScratch,
} from '../controllers/badges';
import multer from '../middlewares/multerForCreatingIcon';

router.route('/').post(createBadge);
router.route('/fromscratch').post(createIconFromScratch);
router.route('/rolls').get(getBadgesByRolls);
router.route('/icons').get(getIcons);
router.route('/iconpreview').post(multer.single('badgeIconImage'), createIconPreview);

router.route('/:id/rolls').get(getBadgeRolls);

export default router;
