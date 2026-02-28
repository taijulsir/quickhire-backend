const express = require('express');
const router = express.Router();
const { jobController } = require('../controllers');
const { authMiddleware, validate } = require('../middlewares');
const { jobValidation } = require('../validators');

router.get('/', jobController.getAllJobs);
router.get('/featured', jobController.getFeaturedJobs);
router.get('/latest', jobController.getLatestJobs);
router.get('/categories', jobController.getJobCategories);
router.get('/:id', jobController.getJobById);

router.post('/', authMiddleware, jobValidation, validate, jobController.createJob);
router.delete('/:id', authMiddleware, jobController.deleteJob);

module.exports = router;
