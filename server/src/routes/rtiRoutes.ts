import { Router } from 'express';
import { generateRti, getRtiDraft } from '../controllers/rtiController';
import { authenticate } from '../utils/validators';

const router = Router();

router.get('/:complaintId', authenticate, getRtiDraft);
router.post('/:complaintId/generate', authenticate, generateRti);

export default router;
