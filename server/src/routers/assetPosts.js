import express from 'express';
const router = express.Router();
import { createAssetPost } from '../controllers/assetPosts';

router.route('/').post(createAssetPost);

export default router;
