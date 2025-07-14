import express from 'express';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/me', auth, (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

export default router;
