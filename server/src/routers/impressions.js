import express from 'express';
const router = express.Router();
import { getImpressions, createImpressionByMember, createImpressionByLauncher } from '../controllers/impressions';

router.route('/bymember').post(createImpressionByMember);
router.route('/bylauncher').post(createImpressionByLauncher);
router.route('/:meetupId').get(getImpressions);

export default router;
