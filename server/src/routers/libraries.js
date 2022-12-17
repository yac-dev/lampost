import express from 'express';
const router = express.Router();
// import { createRoll, getRolls } from '../controllers/rolls';
import { getLibraries, getLibrary } from '../controllers/libraries';

router.route('/').get(getLibraries);
router.route('/:id').get(getLibrary);

export default router;
