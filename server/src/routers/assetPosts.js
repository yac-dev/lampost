import express from 'express';
const router = express.Router();
import { createAssetPost, getAssetPosts } from '../controllers/assetPosts';

router.route('/').post(createAssetPost);
router.route('/:libraryId').get(getAssetPosts);

export default router;
