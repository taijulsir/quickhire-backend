import { body } from 'express-validator';

const applicationValidation = [
  body('job_id')
    .notEmpty()
    .withMessage('Job ID is required')
    .isMongoId()
    .withMessage('Invalid Job ID format'),
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('resume_link')
    .trim()
    .notEmpty()
    .withMessage('Resume link is required')
    .isURL()
    .withMessage('Please provide a valid URL for resume'),
  body('cover_note')
    .trim()
    .notEmpty()
    .withMessage('Cover note is required')
    .isLength({ min: 10 })
    .withMessage('Cover note must be at least 10 characters')
];

export default applicationValidation;
