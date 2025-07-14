import Chat from '../models/chat.js';
import { generateResponse } from '../services/chatGroq.js';

export const createChat = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;

    // Generate initial response
    const assistantResponse = await generateResponse(message);

    const chat = new Chat({
      user: userId,
      title: message.slice(0, 50) + '...',
      messages: [
        { role: 'user', content: message },
        { role: 'assistant', content: assistantResponse }
      ]
    });

    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    console.error('Create chat error:', error);
    res.status(500).json({ error: 'Failed to create chat' });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { message } = req.body;
    const userId = req.user.id;

    const chat = await Chat.findOne({ _id: chatId, user: userId });
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    // Get chat history for context
    const context = chat.messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Generate response using chat history as context
    const assistantResponse = await generateResponse(message, context);

    // Add new messages
    chat.messages.push(
      { role: 'user', content: message },
      { role: 'assistant', content: assistantResponse }
    );

    await chat.save();
    res.json(chat);
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

export const getChats = async (req, res) => {
  try {
    const userId = req.user.id;
    const chats = await Chat.find({ user: userId })
      .sort({ updatedAt: -1 })
      .select('title updatedAt messages');
    
    res.json(chats);
  } catch (error) {
    console.error('Get chats error:', error);
    res.status(500).json({ error: 'Failed to get chats' });
  }
};

export const getChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    const chat = await Chat.findOne({ _id: chatId, user: userId });
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    res.json(chat);
  } catch (error) {
    console.error('Get chat error:', error);
    res.status(500).json({ error: 'Failed to get chat' });
  }
};
