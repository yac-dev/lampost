import express from 'express';
const router = express.Router();
import { createReaction } from '../controllers/libraryAndAssetAndReactionAndUserRelationships';

router.route('/').post(createReaction);

export default router;
