import express from 'express';
const router = express.Router();
import { getIcons } from '../controllers/icons';

router.route('/').get(getIcons);

export default router;
