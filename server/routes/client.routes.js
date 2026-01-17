import express from 'express';
import {
  createClientRequest,
  getUserClientRequests,
  getClientRequestById
} from '../controllers/client.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public route for creating requests
router.post('/', createClientRequest);

// Protected routes
router.get('/user', authenticate, getUserClientRequests);
router.get('/:id', authenticate, getClientRequestById);

export default router;
