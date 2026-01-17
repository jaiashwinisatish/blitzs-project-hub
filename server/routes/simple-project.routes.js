import express from 'express';
import { 
  getAllProjects, 
  createProject, 
  updateProject, 
  deleteProject, 
  getProjectById 
} from '../controllers/simple-project.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Protected routes (require authentication)
router.use(authenticate);

// Admin routes (require admin role)
router.post('/', authorize('admin'), createProject);
router.put('/:id', authorize('admin'), updateProject);
router.delete('/:id', authorize('admin'), deleteProject);

export default router;
