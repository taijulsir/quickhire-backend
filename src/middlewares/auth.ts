import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
import { sendResponse } from '../utils/response.js';

export interface AuthRequest extends Request {
  admin?: Record<string, unknown>;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    sendResponse(res, 401, false, 'Access denied. No token provided');
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.admin = decoded as Record<string, unknown>;
    next();
  } catch {
    sendResponse(res, 401, false, 'Invalid or expired token');
  }
};

export default authMiddleware;
