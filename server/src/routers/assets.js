import express from 'express';
const router = express.Router();
import multer from '../middlewares/multer';
import { createPhoto, createVideo } from '../controllers/assets';
import { authorization } from '../middlewares/authorization';

router.route('/photos').post(multer.single('photo'), createPhoto);
router.route('/videos').post(createVideo);

export default router;
