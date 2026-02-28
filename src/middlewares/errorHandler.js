const { sendResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return sendResponse(res, 400, false, messages.join(', '));
  }

  if (err.name === 'CastError') {
    return sendResponse(res, 400, false, 'Invalid ID format');
  }

  if (err.code === 11000) {
    return sendResponse(res, 400, false, 'Duplicate field value entered');
  }

  return sendResponse(res, err.statusCode || 500, false, err.message || 'Server Error');
};

module.exports = errorHandler;
