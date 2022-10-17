import express from 'express';
const router = express.Router();
import { getUser, connectUser } from '../controllers/users';

router.route('/:id').get(getUser);
router.route('/:id/connect');

export default router;
