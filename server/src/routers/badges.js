import express from 'express';
const router = express.Router();
import { getBadges } from '../controllers/badges';

router.route('/').get(getBadges);
// .get(getPosts);

export default router;
