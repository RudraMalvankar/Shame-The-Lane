import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { verifyToken, JwtPayload } from '../config/jwt';

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

// ─── Auth Middleware ────────────────────────────────────────
export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'No token provided' });
    return;
  }

  try {
    const token = authHeader.split(' ')[1];
    req.user = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export const requireRole = (...roles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ success: false, message: 'Insufficient permissions' });
      return;
    }
    next();
  };

// ─── Validation Chains ────────────────────────────────────
export const validateRegister = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
];

export const validateComplaint = [
  body('rawRant').trim().notEmpty().isLength({ max: 5000 }),
  body('location.coordinates').isArray({ min: 2, max: 2 }),
  body('location.address').trim().notEmpty(),
  body('location.city').trim().notEmpty(),
  body('location.state').trim().notEmpty(),
];

// ─── Validation Result Handler ─────────────────────────────
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
    return;
  }
  next();
};
