import express from 'express';
const router = express.Router();
import {
  createLauncherAndPatronRelationship,
  getMyLaunchersByUserId,
  isSupportingLauncher,
  getPatronsByLauncherId,
  sendLaunchNotificationsToPatrons,
} from '../controllers/launcherAndPatronRelationshis';

router.route('/').post(createLauncherAndPatronRelationship);
router.route('/launcher/:launcherId/patron/:patronId').get(isSupportingLauncher);
router.route('/:userId').get(getMyLaunchersByUserId);
router.route('/patronnotification').post(sendLaunchNotificationsToPatrons);

export default router;
