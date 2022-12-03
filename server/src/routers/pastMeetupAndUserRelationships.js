import express from 'express';
const router = express.Router();
import { getPastMeetupsByUserId } from '../controllers/pastMeetupAndUserRelationships';

router.route('/:userId').get(getPastMeetupsByUserId);

export default router;
