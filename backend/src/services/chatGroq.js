import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const chatGroqApi = axios.create({
  baseURL: process.env.CHATGROQ_API_URL,
  headers: {
    'Authorization': `Bearer ${process.env.CHATGROQ_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export const generateResponse = async (prompt, context = []) => {
  try {
    const response = await chatGroqApi.post('/chat/completions', {
      model: 'chatgroq-1',
      messages: [
        ...context,
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('ChatGroq API Error:', error);
    throw new Error('Failed to generate response');
  }
};

export default {
  generateResponse
};
