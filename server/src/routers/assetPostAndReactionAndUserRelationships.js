import express from 'express';
const router = express.Router();
import { createReaction, getReactionsByAssetPostId } from '../controllers/assetPostAndReactionAndUserRelationships';

router.route('/').post(createReaction);
router.route('/:assetPostId').get(getReactionsByAssetPostId);

export default router;
