import { validationResult } from 'express-validator';
import { sendResponse } from '../utils/response.js';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map(err => err.msg);
    return sendResponse(res, 400, false, messages[0]);
  }
  next();
};

export default validate;
