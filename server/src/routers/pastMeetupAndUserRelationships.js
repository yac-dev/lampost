import express from 'express';
const router = express.Router();
import { getPastMeetupsByUserId, getLaunchedMeetupsByLauncherId } from '../controllers/pastMeetupAndUserRelationships';

router.route('/pastmeetups/:userId').get(getPastMeetupsByUserId);
router.route('/launchedmeetups/:launcherId').get(getLaunchedMeetupsByLauncherId);

export default router;
