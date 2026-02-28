const { body } = require('express-validator');

const jobValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('company')
    .trim()
    .notEmpty()
    .withMessage('Company is required'),
  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['Design', 'Sales', 'Marketing', 'Finance', 'Technology', 'Engineering', 'Business', 'Human Resource'])
    .withMessage('Invalid category'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters'),
  body('type')
    .optional()
    .isIn(['Full Time', 'Part Time', 'Contract', 'Remote'])
    .withMessage('Invalid job type'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
];

module.exports = jobValidation;
