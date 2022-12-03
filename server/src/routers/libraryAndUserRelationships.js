import express from 'express';
const router = express.Router();
import { joinLibrary, getMyJoinedLibrary } from '../controllers/libraryAndUserRelationships';

router.route('/:userId').get(getMyJoinedLibrary);
router.route('/').post(joinLibrary);

export default router;
