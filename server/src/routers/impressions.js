import express from 'express';
const router = express.Router();
import { getImpressions, createImpression } from '../controllers/impressions';

router.route('/').post(createImpression);
router.route('/:meetupId').get(getImpressions);
// router.route('/:meetupId').get()

export default router;
