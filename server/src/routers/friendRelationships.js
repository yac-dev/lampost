import express from 'express';
const router = express.Router();
import { createFriendRelationship, getMyFriends } from '../controllers/friendRelationships';

router.route('/:userId').get(getMyFriends).post(createFriendRelationship);

export default router;
