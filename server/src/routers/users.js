import express from 'express';
const router = express.Router();
import { getUser, connectUser, addBadges, getPastMeetups, getUserAssets } from '../controllers/users';

router.route('/:id').get(getUser);
router.route('/:id/assets').get(getUserAssets);
router.route('/:id/addbadges').patch(addBadges);
router.route('/:id/connect');
router.route('/:id/pastmeetups').get(getPastMeetups);

export default router;
