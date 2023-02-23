import express from 'express';
const router = express.Router();
import { clapLeadership, clapPersonality } from '../controllers/claps';

router.route('/leadership').post(clapLeadership);
router.route('/personality').post(clapPersonality);

export default router;
