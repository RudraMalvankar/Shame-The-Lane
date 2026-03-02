import { Request, Response, NextFunction } from 'express';
import { Complaint } from '../models/Complaint';
import { generateRtiLetter } from '../services/rtiService';
import { sendRtiConfirmationEmail } from '../services/emailService';
import { User } from '../models/User';

interface AuthRequest extends Request {
  user?: { userId: string; email: string };
}

export const generateRti = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const complaint = await Complaint.findById(req.params.complaintId);

    if (!complaint) {
      res.status(404).json({ success: false, message: 'Complaint not found' });
      return;
    }

    const user = await User.findById(req.user!.userId);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    const rtiLetter = await generateRtiLetter({
      applicantName: user.name,
      applicantAddress: req.body.address || 'Address not provided',
      department: complaint.department || 'Municipal Corporation',
      subject: complaint.cleanTitle,
      issueDescription: complaint.cleanDescription,
      location: `${complaint.location.address}, ${complaint.location.city}`,
      date: new Date().toLocaleDateString('en-IN'),
    });

    // Save RTI draft to complaint
    await Complaint.findByIdAndUpdate(req.params.complaintId, {
      rtiDraft: rtiLetter,
      rtiFiledAt: new Date(),
    });

    // Send confirmation email
    await sendRtiConfirmationEmail(user.email, user.name, complaint.cleanTitle);

    res.status(200).json({ success: true, data: { rtiLetter } });
  } catch (error) {
    next(error);
  }
};

export const getRtiDraft = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const complaint = await Complaint.findById(req.params.complaintId).select(
      'rtiDraft rtiFiledAt cleanTitle'
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
