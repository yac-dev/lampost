import express from 'express';
const router = express.Router();
import { getReactionIcons, createReactionIconPreview, createReactionIcon } from '../controllers/reactionIcons';
import multerForReactionIcon from '../middlewares/multerForReactionIcon';

router.route('/').get(getReactionIcons).post(createReactionIcon);
router.route('/preview').post(multerForReactionIcon.single('reactionIconImage'), createReactionIconPreview);

export default router;
