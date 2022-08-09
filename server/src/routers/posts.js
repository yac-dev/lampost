import express from 'express';
const router = express.Router();
import { createPost } from '../controllers/posts';
import { authorization } from '../middlewares/authorization';

router.post('/', createPost);
// router.post('/login', login);
// router.get('/loadMe', authorization, loadMe);

export default router;
