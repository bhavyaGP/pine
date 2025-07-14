import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  isUser: boolean;
}

export interface Chat {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  taskId?: number; // Reference to the task that created this chat
}

interface ChatStore {
  chats: Chat[];
  activeChat: string | null;
  setActiveChat: (chatId: string | null) => void;
  addChat: (chat: Omit<Chat, 'id'>) => string;
  addMessage: (chatId: string, message: Omit<ChatMessage, 'id'>) => void;
  getRecentChats: (limit?: number) => Chat[];
}

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  activeChat: null,
  
  setActiveChat: (chatId) => set({ activeChat: chatId }),
  
  addChat: (chat) => {
    const id = `chat-${Date.now()}`;
    const newChat = { ...chat, id };
    
    set((state) => ({
      chats: [newChat, ...state.chats],
      activeChat: id
    }));
    
    return id;
  },
  
  addMessage: (chatId, message) => {
    const id = `msg-${Date.now()}`;
    
    set((state) => ({
      chats: state.chats.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, { ...message, id }]
          };
        }
        return chat;
      })
    }));
  },
  
  getRecentChats: (limit = 5) => {
    const { chats } = get();
    return chats
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}));