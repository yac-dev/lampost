import express from 'express';
const router = express.Router();
import { createRoll, getRolls } from '../controllers/rolls';

router.route('/').post(createRoll).get(getRolls);

export default router;
