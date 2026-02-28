import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { sendResponse } from '../utils/response.js';

const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((err) => err.msg);
    sendResponse(res, 400, false, messages[0]);
    return;
  }
  next();
};

export default validate;
