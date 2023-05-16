import express from 'express';
const router = express.Router();
import { getIconsByIconType } from '../controllers/iconAndIconTypeRelationships';

router.route('/:iconTypeId').get(getIconsByIconType);

export default router;
