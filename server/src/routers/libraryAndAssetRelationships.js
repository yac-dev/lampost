import express from 'express';
const router = express.Router();
import {
  getAssetsByLibraryId,
  postAssetsByLibraryId,
  getAsset,
  createReaction,
  getLibraryAssetsByMonth,
} from '../controllers/libraryAndAssetRelationships';

router.route('/:libraryId').get(getLibraryAssetsByMonth).post(postAssetsByLibraryId);
router.route('/:libraryId/:assetId').get(getAsset).post(createReaction);

export default router;
