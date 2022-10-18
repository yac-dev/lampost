import express from 'express';
const router = express.Router();
import { getBadges } from '../controllers/badges';

router.route('/').get(getBadges);

export default router;
