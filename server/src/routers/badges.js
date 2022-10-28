import express from 'express';
const router = express.Router();
import { getBadges } from '../controllers/badges';

router.route('/').post(getBadges);

export default router;
