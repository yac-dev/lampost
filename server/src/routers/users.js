import express from 'express';
const router = express.Router();
import { getUser, connectUser, addBadges } from '../controllers/users';

router.route('/:id').get(getUser);
router.route('/:id/addbadges').patch(addBadges);
router.route('/:id/connect');

export default router;
