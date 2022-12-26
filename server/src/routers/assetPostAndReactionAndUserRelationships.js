import express from 'express';
const router = express.Router();
import {
  createReaction,
  getReactionsByAssetPostId,
  upvoteReaction,
  downvoteReaction,
} from '../controllers/assetPostAndReactionAndUserRelationships';

router.route('/').post(createReaction);
router.route('/:assetPostId').get(getReactionsByAssetPostId);
router.route('/upvote').post(upvoteReaction);
router.route('/downvote').post(downvoteReaction);

export default router;
