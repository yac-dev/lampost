import express from 'express';
const router = express.Router();
import { createInvitation } from '../controllers/notifications';

router.route('/invitations').post(createInvitation);
router.route('/invitations/:userId');

export default router;
