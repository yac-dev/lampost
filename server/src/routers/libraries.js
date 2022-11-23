import express from 'express';
const router = express.Router();
// import { createRoll, getRolls } from '../controllers/rolls';
import { createLibrary, getLibraries, getLibrary } from '../controllers/libraries';

router.route('/').post(createLibrary).get(getLibraries);
router.route('/:id').get(getLibrary);

export default router;
