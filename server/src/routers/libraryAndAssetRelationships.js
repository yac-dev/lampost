import express from 'express';
const router = express.Router();
import {
  getAssetsByLibraryId,
  postAssetsByLibraryId,
  getAsset,
  createReaction,
  getLibraryAssetsByMonth,
  getLibraryAssetsByDate,
} from '../controllers/libraryAndAssetRelationships';

router.route('/:libraryId/assets').get(getAssetsByLibraryId);
router.route('/:libraryId').get(getLibraryAssetsByMonth).post(postAssetsByLibraryId);
// ここのrouting、気をつけてな。
router.route('/:libraryId/dateassets').get(getLibraryAssetsByDate);
router.route('/:libraryId/:assetId').get(getAsset).post(createReaction);

export default router;
