import express from 'express';
const router = express.Router();
import { getAssetsByLibraryId, postAssetsByLibraryId, getAsset } from '../controllers/libraryAndAssetRelationships';

router.route('/:libraryId').get(getAssetsByLibraryId).post(postAssetsByLibraryId);
router.route('/:libraryId/:assetId').get(getAsset);

export default router;
