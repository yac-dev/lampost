import express from 'express';
const router = express.Router();
import { createQuestion } from '../controllers/questions';
import { authorization } from '../middlewares/authorization';

router.route('/').post(createQuestion);
// router.post('/login', login);
// router.get('/loadMe', authorization, loadMe);

export default router;
