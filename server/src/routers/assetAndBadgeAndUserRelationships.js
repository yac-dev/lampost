import express from 'express';
const router = express.Router();
import { upvoteBadgeLike, getBadgeLikes } from '../controllers/assetAndBadgeAndUserRelationships';

router.route('/').post(upvoteBadgeLike);
router.route('/:assetId').get(getBadgeLikes);

export default router;
