import express from 'express';
import { applicationController } from '../controllers/index.js';
import { authMiddleware, validate } from '../middlewares/index.js';
import { applicationValidation } from '../validators/index.js';

const router = express.Router();

router.post(
  '/',
  applicationValidation,
  validate,
  applicationController.createApplication
);
router.get('/', authMiddleware, applicationController.getAllApplications);
router.get(
  '/job/:jobId',
  authMiddleware,
  applicationController.getApplicationsByJob
);

export default router;
