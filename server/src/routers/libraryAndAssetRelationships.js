import express from 'express';
const router = express.Router();
import { getAssetsByLibraryId } from '../controllers/libraryAndAssetRelationships';

router.route('/:libraryId').get(getAssetsByLibraryId);

export default router;
