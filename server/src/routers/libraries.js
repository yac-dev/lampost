import express from 'express';
const router = express.Router();
// import { createRoll, getRolls } from '../controllers/rolls';
import { createLibrary, getLibraries } from '../controllers/libraries';

router.route('/').post(createLibrary).get(getLibraries);

export default router;
