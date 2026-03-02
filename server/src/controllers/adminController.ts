import { Request, Response, NextFunction } from 'express';
import { Complaint } from '../models/Complaint';
import { User } from '../models/User';
import { Resolution } from '../models/Resolution';

interface AuthRequest extends Request {
  user?: { userId: string; role: string };
}

const requireAdmin = (req: AuthRequest, res: Response): boolean => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({ success: false, message: 'Admin access required' });
    return false;
  }
  return true;
};

export const getDashboardStats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!requireAdmin(req, res)) return;

    const [
      totalComplaints,
      pendingComplaints,
      resolvedComplaints,
      totalUsers,
    ] = await Promise.all([
      Complaint.countDocuments(),
      Complaint.countDocuments({ status: 'pending' }),
      Complaint.countDocuments({ status: 'resolved' }),
      User.countDocuments(),
    ]);

    const categoryStats = await Complaint.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalComplaints,
        pendingComplaints,
        resolvedComplaints,
        totalUsers,
        categoryStats,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateComplaintStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!requireAdmin(req, res)) return;

    const { status } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!complaint) {
      res.status(404).json({ success: false, message: 'Complaint not found' });
      return;
    }

    res.status(200).json({ success: true, data: complaint });
  } catch (error) {
    next(error);
  }
};

export const getWallOfShame = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Cities/departments with most unresolved high-pressure complaints
    const shameData = await Complaint.aggregate([
      { $match: { status: { $in: ['pending', 'acknowledged'] } } },
      {
        $group: {
          _id: '$location.city',
          totalPressure: { $sum: '$pressureScore' },
          complaintCount: { $sum: 1 },
          avgSeverity: { $avg: '$severity' },
        },
      },
      { $sort: { totalPressure: -1 } },
      { $limit: 20 },
    ]);

    res.status(200).json({ success: true, data: shameData });
  } catch (error) {
    next(error);
  }
};

export const getWallOfFame = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Cities with highest resolution rate
    const fameData = await Complaint.aggregate([
      {
        $group: {
          _id: '$location.city',
          total: { $sum: 1 },
          resolved: {
            $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] },
          },
        },
      },
      {
        $addFields: {
          resolutionRate: { $divide: ['$resolved', '$total'] },
        },
      },
      { $match: { total: { $gte: 5 } } }, // min 5 complaints
      { $sort: { resolutionRate: -1 } },
      { $limit: 20 },
    ]);

    res.status(200).json({ success: true, data: fameData });
  } catch (error) {
    next(error);
  }
};
