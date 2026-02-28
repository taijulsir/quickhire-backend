import express from 'express';
const router = express.Router();
import { jobController } from '../controllers/index.js';
import { authMiddleware, validate, upload } from '../middlewares/index.js';
import { jobValidation } from '../validators/index.js';

router.get('/', jobController.getAllJobs);
router.get('/featured', jobController.getFeaturedJobs);
router.get('/latest', jobController.getLatestJobs);
router.get('/categories', jobController.getJobCategories);
router.get('/:id', jobController.getJobById);

router.post('/', authMiddleware, upload.single('companyLogo'), jobValidation, validate, jobController.createJob);
router.put('/:id', authMiddleware, upload.single('companyLogo'), jobValidation, validate, jobController.updateJob);
router.delete('/:id', authMiddleware, jobController.deleteJob);

export default router;
