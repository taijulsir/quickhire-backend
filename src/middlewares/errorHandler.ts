import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/response.js';
import logger from '../utils/logger.js';

interface ErrorWithStatus extends Error {
  statusCode?: number;
  code?: number;
  errors?: Record<string, { message: string }>;
}

const errorHandler = (
  err: ErrorWithStatus,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error(err);

  if (err.name === 'ValidationError' && err.errors) {
    const messages = Object.values(err.errors).map((val) => val.message);
    sendResponse(res, 400, false, messages.join(', '));
    return;
  }

  if (err.name === 'CastError') {
    sendResponse(res, 400, false, 'Invalid ID format');
    return;
  }

  if (err.code === 11000) {
    sendResponse(res, 400, false, 'Duplicate field value entered');
    return;
  }

  sendResponse(res, err.statusCode || 500, false, err.message || 'Server Error');
};

export default errorHandler;
