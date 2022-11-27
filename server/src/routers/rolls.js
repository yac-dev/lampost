import express from 'express';
const router = express.Router();
import { createRoll, getRolls, getRollAndRelationships } from '../controllers/rolls';

// router.route('/').post(createRoll).get(getRolls);
router.route('/:id').get(getRollAndRelationships);

export default router;
