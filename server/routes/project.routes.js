import express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  purchaseProject,
  downloadProject,
  addReview
} from '../controllers/project.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Protected routes
router.post('/:id/purchase', authenticate, purchaseProject);
router.post('/:id/download', authenticate, downloadProject);
router.post('/:id/review', authenticate, addReview);

// Admin only routes
router.post('/', authenticate, authorize('admin'), createProject);
router.put('/:id', authenticate, authorize('admin'), updateProject);
router.delete('/:id', authenticate, authorize('admin'), deleteProject);

export default router;
