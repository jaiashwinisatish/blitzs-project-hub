import express from 'express';
import {
  getUserOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getOrderStats
} from '../controllers/order.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected routes
router.get('/user', authenticate, getUserOrders);
router.get('/stats', authenticate, authorize('admin'), getOrderStats);
router.get('/:id', authenticate, getOrderById);

// Admin only routes
router.get('/', authenticate, authorize('admin'), getAllOrders);
router.put('/:id/status', authenticate, authorize('admin'), updateOrderStatus);

export default router;
