import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
import { sendResponse } from '../utils/response.js';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies?.token;

  if (!token) {
    sendResponse(res, 401, false, 'Access denied. No token provided');
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.id as string, role: decoded.role as string };
    next();
  } catch (err) {
    const isExpired = err instanceof Error && err.name === 'TokenExpiredError';
    sendResponse(res, 401, false, isExpired ? 'Token expired' : 'Invalid token');
  }
};

export default authMiddleware;
