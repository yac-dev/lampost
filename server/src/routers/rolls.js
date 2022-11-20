import express from 'express';
const router = express.Router();
import { createRoll } from '../controllers/rolls';

router.route('/').post(createRoll);

export default router;
