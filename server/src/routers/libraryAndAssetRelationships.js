import express from 'express';
const router = express.Router();
import {
  getAssetsByLibraryId,
  postAssetsByLibraryId,
  getAsset,
  createReaction,
  getLibraryAssetsByMonth,
  getLibraryAssetsByDate,
  getPostedAssets,
  createComment,
} from '../controllers/libraryAndAssetRelationships';

router.route('/:libraryId/assets').get(getAssetsByLibraryId);
router.route('/library/:libraryId/user/:userId').get(getPostedAssets);
router.route('/:libraryId').get(getLibraryAssetsByMonth).post(postAssetsByLibraryId);
// ここのrouting、気をつけてな。
router.route('/:libraryId/dateassets').get(getLibraryAssetsByDate);
router.route('/:libraryId/:assetId').get(getAsset).post(createReaction);
router.route('/:libraryId/:assetId/comment').post(createComment);

export default router;
