const express = require('express');
const router = express.Router();
const { applicationController } = require('../controllers');
const { authMiddleware, validate } = require('../middlewares');
const { applicationValidation } = require('../validators');

router.post('/', applicationValidation, validate, applicationController.createApplication);
router.get('/', authMiddleware, applicationController.getAllApplications);
router.get('/job/:jobId', authMiddleware, applicationController.getApplicationsByJob);

module.exports = router;
