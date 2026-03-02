import { Router } from 'express';
import {
  getDashboardStats,
  updateComplaintStatus,
  getWallOfShame,
  getWallOfFame,
} from '../controllers/adminController';
import { authenticate } from '../utils/validators';

const router = Router();

router.get('/stats', authenticate, getDashboardStats);
router.patch('/complaints/:id/status', authenticate, updateComplaintStatus);
router.get('/wall-of-shame', getWallOfShame);
router.get('/wall-of-fame', getWallOfFame);

export default router;
