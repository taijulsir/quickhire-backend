import express from 'express';
import { adminController } from '../controllers/index.js';
import { authMiddleware, validate } from '../middlewares/index.js';
import { adminLoginValidation } from '../validators/index.js';

const router = express.Router();

router.post('/login', adminLoginValidation, validate, adminController.login);
router.post('/logout', adminController.logout);
router.get('/check', authMiddleware, adminController.checkAuth);
router.get(
  '/dashboard-stats',
  authMiddleware,
  adminController.getDashboardStats
);

export default router;
