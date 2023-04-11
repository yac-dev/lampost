import express from 'express';
const router = express.Router();
import {
  getAssetsByLibraryId,
  postAssetsByLibraryId,
  getAsset,
  createReaction,
} from '../controllers/libraryAndAssetRelationships';

router.route('/:libraryId').get(getAssetsByLibraryId).post(postAssetsByLibraryId);
router.route('/:libraryId/:assetId').get(getAsset).post(createReaction);

export default router;
