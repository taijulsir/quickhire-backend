const express = require('express');
const router = express.Router();
const { adminController } = require('../controllers');
const { authMiddleware, validate } = require('../middlewares');
const { adminLoginValidation } = require('../validators');

router.post('/login', adminLoginValidation, validate, adminController.login);
router.post('/logout', adminController.logout);
router.get('/check', authMiddleware, adminController.checkAuth);

module.exports = router;
