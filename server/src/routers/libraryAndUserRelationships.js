import express from 'express';
const router = express.Router();
import { joinLibrary, leaveLibrary, getMyJoinedLibrary } from '../controllers/libraryAndUserRelationships';

router.route('/:userId/:libraryId').delete(leaveLibrary);
router.route('/:userId').get(getMyJoinedLibrary);
router.route('/').post(joinLibrary);

export default router;
