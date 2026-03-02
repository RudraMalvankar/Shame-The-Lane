import { Request, Response, NextFunction } from 'express';
import { Vote } from '../models/Vote';
import { recalculatePressureScore } from '../services/pressureService';

interface AuthRequest extends Request {
  user?: { userId: string };
}

export const castVote = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { complaintId, type } = req.body;
    const userId = req.user!.userId;

    // Upsert vote
    const vote = await Vote.findOneAndUpdate(
      { user: userId, complaint: complaintId },
      { type },
      { upsert: true, new: true }
    );

    // Recalculate pressure score
    const newScore = await recalculatePressureScore(complaintId);

    res.status(200).json({ success: true, data: { vote, pressureScore: newScore } });
  } catch (error) {
    next(error);
  }
};

export const removeVote = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { complaintId } = req.params;
    const userId = req.user!.userId;

    await Vote.findOneAndDelete({ user: userId, complaint: complaintId });
    const newScore = await recalculatePressureScore(complaintId);

    res.status(200).json({ success: true, data: { pressureScore: newScore } });
  } catch (error) {
    next(error);
  }
};

export const getUserVote = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { complaintId } = req.params;
    const userId = req.user!.userId;

    const vote = await Vote.findOne({ user: userId, complaint: complaintId });
    res.status(200).json({ success: true, data: vote });
  } catch (error) {
    next(error);
  }
};
