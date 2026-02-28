const { verifyToken } = require('../utils/jwt');
const { sendResponse } = require('../utils/response');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return sendResponse(res, 401, false, 'Access denied. No token provided');
  }

  try {
    const decoded = verifyToken(token);
    req.admin = decoded;
    next();
  } catch (error) {
    return sendResponse(res, 401, false, 'Invalid or expired token');
  }
};

module.exports = authMiddleware;
