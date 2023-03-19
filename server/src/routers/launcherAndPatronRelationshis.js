import express from 'express';
const router = express.Router();
import {
  createLauncherAndPatronRelationship,
  getMyLaunchersByUserId,
  isSupportingLauncher,
  getPatronsByLauncherId,
} from '../controllers/launcherAndPatronRelationshis';

router.route('/').post(createLauncherAndPatronRelationship);
router.route('/launcher/:launcherId/patron/:patronId').get(isSupportingLauncher);
router.route('/:userId').get(getMyLaunchersByUserId);

export default router;
