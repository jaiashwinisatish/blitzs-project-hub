import express from 'express';
import {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
  getAllProjectsAdmin,
  getAllClientRequests,
  updateRequestStatus,
  getAllDevelopers,
  addDeveloper
} from '../controllers/admin.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require admin authentication
router.use(authenticate, authorize('admin'));

// Dashboard
router.get('/dashboard/stats', getDashboardStats);

// User management
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.put('/users/:id/toggle-status', toggleUserStatus);

// Project management
router.get('/projects', getAllProjectsAdmin);

// Developer management
router.get('/developers', getAllDevelopers);
router.post('/developers', addDeveloper);

// Client request management
router.get('/requests', getAllClientRequests);
router.put('/requests/:id/status', updateRequestStatus);

export default router;
