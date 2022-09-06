import express from 'express';
const router = express.Router();
import { getBadgeElements } from '../controllers/badgeElements';

router.route('/').get(getBadgeElements);
// .get(getPosts);

export default router;
