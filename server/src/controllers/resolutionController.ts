import { Request, Response, NextFunction } from 'express';
import { Resolution } from '../models/Resolution';
import { Complaint } from '../models/Complaint';

interface AuthRequest extends Request {
  user?: { userId: string; role: string };
}

export const createResolution = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { complaintId, description, evidenceImages, officialRef } = req.body;

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      res.status(404).json({ success: false, message: 'Complaint not found' });
      return;
    }

    const resolution = await Resolution.create({
      complaint: complaintId,
      resolvedBy: req.user!.userId,
      description,
      evidenceImages: evidenceImages ?? [],
      officialRef,
    });

    // Update complaint status
    await Complaint.findByIdAndUpdate(complaintId, { status: 'in_progress' });

    res.status(201).json({ success: true, data: resolution });
  } catch (error) {
    next(error);
  }
};

export const getResolutionsByComplaint = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const resolutions = await Resolution.find({
      complaint: req.params.complaintId,
    })
      .populate('resolvedBy', 'name avatar role')
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ success: true, data: resolutions });
  } catch (error) {
    next(error);
  }
};

export const verifyResolution = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.user?.role !== 'admin' && req.user?.role !== 'moderator') {
      res.status(403).json({ success: false, message: 'Forbidden' });
      return;
    }

    const resolution = await Resolution.findByIdAndUpdate(
      req.params.id,
      { verifiedByAdmin: true, verifiedAt: new Date() },
      { new: true }
    );

    if (!resolution) {
      res.status(404).json({ success: false, message: 'Resolution not found' });
      return;
    }

    // Mark complaint as resolved
    await Complaint.findByIdAndUpdate(resolution.complaint, {
      status: 'resolved',
    });

    res.status(200).json({ success: true, data: resolution });
  } catch (error) {
    next(error);
  }
};
