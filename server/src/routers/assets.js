import express from 'express';
const router = express.Router();
import multer from '../middlewares/multer';
import multerForPhoto from '../middlewares/multerForPhoto';
import {
  createPhoto,
  createVideo,
  getUserAssets,
  getAssetById,
  getMeetupAssets,
  getTaggedPeople,
} from '../controllers/assets';
import { authorization } from '../middlewares/authorization';

router.route('/meetup/:meetupId').get(getMeetupAssets);
router.route('/createdby/:userId').get(getUserAssets);
// router.route('/').post(getUserAssets);
router.route('/photos').post(multerForPhoto.single('asset'), createPhoto);
router.route('/videos').post(multer.single('asset'), createVideo);
router.route('/taggedpeople').post(getTaggedPeople);
router.route('/:id').get(getAssetById);

export default router;
