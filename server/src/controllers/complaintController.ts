import { Request, Response, NextFunction } from 'express';
import { Complaint } from '../models/Complaint';
import { processRant } from '../services/aiService';
import { recalculatePressureScore } from '../services/pressureService';

interface AuthRequest extends Request {
  user?: { userId: string; email: string; role: string };
}

export const createComplaint = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { rawRant, location, isAnonymous } = req.body;
    const locationStr = `${location.address}, ${location.city}, ${location.state}`;

    // Process with AI
    const aiResult = await processRant(rawRant, locationStr);

    const complaint = await Complaint.create({
      rawRant,
      ...aiResult,
      location,
      author: req.user!.userId,
      isAnonymous: isAnonymous ?? false,
      aiProcessed: true,
    });

    res.status(201).json({ success: true, data: complaint });
  } catch (error) {
    next(error);
  }
};

export const getComplaints = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      status,
      city,
      sortBy = 'createdAt',
    } = req.query;

    const query: Record<string, unknown> = {};
    if (category) query.category = category;
    if (status) query.status = status;
    if (city) query['location.city'] = city;

    const validSortFields: Record<string, Record<string, number>> = {
      createdAt: { createdAt: -1 },
      pressureScore: { pressureScore: -1 },
      voteCount: { voteCount: -1 },
    };

    const sort = validSortFields[sortBy as string] ?? { createdAt: -1 };

    const complaints = await Complaint.find(query)
      .sort(sort)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate('author', 'name avatar')
      .lean();

    const total = await Complaint.countDocuments(query);

    res.status(200).json({
      success: true,
      data: complaints,
      pagination: { page: Number(page), limit: Number(limit), total },
    });
  } catch (error) {
    next(error);
  }
};

export const getComplaintById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('author', 'name avatar')
      .populate('campaign');

    if (!complaint) {
      res.status(404).json({ success: false, message: 'Complaint not found' });
      return;
    }

    res.status(200).json({ success: true, data: complaint });
  } catch (error) {
    next(error);
  }
};

export const getNearbyComplaints = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { lat, lng, radius = 5000 } = req.query;

    const complaints = await Complaint.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [Number(lng), Number(lat)],
          },
          $maxDistance: Number(radius),
        },
      },
    })
      .limit(100)
      .lean();

    res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    next(error);
  }
};
