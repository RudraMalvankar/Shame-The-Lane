import { Router } from 'express';
import {
  createComplaint,
  getComplaints,
  getComplaintById,
  getNearbyComplaints,
} from '../controllers/complaintController';
import {
  createResolution,
  getResolutionsByComplaint,
  verifyResolution,
} from '../controllers/resolutionController';
import { castVote, removeVote, getUserVote } from '../controllers/voteController';
import { authenticate } from '../utils/validators';

const router = Router();

// Complaints
router.get('/', getComplaints);
router.get('/nearby', getNearbyComplaints);
router.get('/:id', getComplaintById);
router.post('/', authenticate, createComplaint);

// Resolutions
router.get('/:complaintId/resolutions', getResolutionsByComplaint);
router.post('/resolutions', authenticate, createResolution);
router.patch('/resolutions/:id/verify', authenticate, verifyResolution);

// Votes
router.post('/votes', authenticate, castVote);
router.delete('/votes/:complaintId', authenticate, removeVote);
router.get('/votes/:complaintId/me', authenticate, getUserVote);

export default router;
