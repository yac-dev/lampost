import express from 'express';
const router = express.Router();
import { getRollAssets } from '../controllers/rollAndAssetRelationships';

router.route('/:rollId').get(getRollAssets);

export default router;
