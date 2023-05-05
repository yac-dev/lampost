import express from 'express';
const router = express.Router();
import { getNotifications, createLibraryInvitation } from '../controllers/notifications';

router.route('/:userId').get(getNotifications);
router.route('/invitation/library/:libraryId').post(createLibraryInvitation);

export default router;
