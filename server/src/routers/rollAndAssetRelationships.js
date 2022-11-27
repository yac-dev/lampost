import express from 'express';
const router = express.Router();
import { getAssetsOfRoll } from '../controllers/rollAndAssetRelationships';

router.route('/:rollId').get(getAssetsOfRoll);

export default router;
