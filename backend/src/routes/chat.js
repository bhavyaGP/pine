import express from 'express';
import { createChat, sendMessage, getChats, getChat } from '../controllers/chat.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(auth);

router.post('/', createChat);
router.get('/', getChats);
router.get('/:chatId', getChat);
router.post('/:chatId/messages', sendMessage);

export default router;
