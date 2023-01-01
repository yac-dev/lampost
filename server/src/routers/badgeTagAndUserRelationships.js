import express from 'express';
const router = express.Router();
import { addNewBadgeTagToUser } from '../controllers/badgeTagAndUserRelationships';

router.route('/').post(addNewBadgeTagToUser);

export default router;
