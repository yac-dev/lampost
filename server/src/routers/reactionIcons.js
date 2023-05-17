import express from 'express';
const router = express.Router();
import { getReactionIcons } from '../controllers/reactionIcons';

router.route('/').get(getReactionIcons);

export default router;
