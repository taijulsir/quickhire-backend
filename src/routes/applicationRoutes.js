import express from 'express';
const router = express.Router();
import { applicationController } from '../controllers/index.js';
import { authMiddleware, validate } from '../middlewares/index.js';
import { applicationValidation } from '../validators/index.js';

router.post('/', applicationValidation, validate, applicationController.createApplication);
router.get('/', authMiddleware, applicationController.getAllApplications);
router.get('/job/:jobId', authMiddleware, applicationController.getApplicationsByJob);

export default router;
