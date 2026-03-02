import { Complaint } from '../models/Complaint';
import { Vote } from '../models/Vote';
import { sendEscalationEmail } from './emailService';
import { logger } from '../utils/logger';

const ESCALATION_THRESHOLDS = [50, 100, 250, 500, 1000];

/**
 * Recalculates pressure score for a complaint.
 * Formula: base votes + severity multiplier + age decay penalty
 */
export const recalculatePressureScore = async (
  complaintId: string
): Promise<number> => {
  const complaint = await Complaint.findById(complaintId);
  if (!complaint) throw new Error('Complaint not found');

  const votes = await Vote.countDocuments({
    complaint: complaintId,
    type: 'upvote',
  });

  const ageInDays =
    (Date.now() - complaint.createdAt.getTime()) / (1000 * 60 * 60 * 24);

  // Higher severity = amplified score; older unresolved = higher pressure
  const severityMultiplier = complaint.severity * 1.5;
  const ageBonus = complaint.status === 'pending' ? Math.min(ageInDays * 2, 100) : 0;

  const score = Math.round(votes * severityMultiplier + ageBonus);

  await Complaint.findByIdAndUpdate(complaintId, {
    pressureScore: score,
    voteCount: votes,
  });

  // Check escalation thresholds
  await checkEscalation(complaintId, score, complaint.pressureScore);

  return score;
};

const checkEscalation = async (
  complaintId: string,
  newScore: number,
  oldScore: number
): Promise<void> => {
  for (const threshold of ESCALATION_THRESHOLDS) {
    if (oldScore < threshold && newScore >= threshold) {
      logger.info(
        `Complaint ${complaintId} crossed pressure threshold ${threshold}`
      );
      // TODO: wire up official email lookup and send escalation
      // await sendEscalationEmail(...)
    }
  }
};

export const getTopPressureComplaints = async (
  limit = 10,
  city?: string
) => {
  const query = city ? { 'location.city': city } : {};
  return Complaint.find(query)
    .sort({ pressureScore: -1 })
    .limit(limit)
    .populate('author', 'name avatar')
    .lean();
};
