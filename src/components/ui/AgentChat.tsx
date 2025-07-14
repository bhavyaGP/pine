"use client";

import { useState, useEffect, useRef } from "react";
import { useChatStore } from "@/store/chatStore";
import { getChatResponseByTask } from "@/data/chatResponses";
import { ChatInput } from "./ChatInput";

export function AgentChat({ chatId }: { chatId: string }) {
  const { chats, addMessage } = useChatStore();
  const chat = chats.find((c) => c.id === chatId);
  const responseTemplate = chat ? getChatResponseByTask(chat.title) : null;
  const supportLinks = responseTemplate?.supportLinks || [];
  const [responseIndex, setResponseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const initialMessagesAdded = useRef(false);

  useEffect(() => {
    if (!chat || !responseTemplate) return;
    if (chat.messages.length === 0 && !initialMessagesAdded.current) {
      initialMessagesAdded.current = true;
      setIsTyping(true);
      setTimeout(() => {
        addMessage(chat.id, {
          content: responseTemplate.initialMessage,
          timestamp: new Date(),
          isUser: false,
        });
        setIsTyping(false);
      }, 1200);
    }
  }, [chat, responseTemplate, addMessage]);

  const handleSendMessage = (message: string) => {
    if (!chat) return;
    addMessage(chat.id, {
      content: message,
      timestamp: new Date(),
      isUser: true,
    });
    // Get next response from template if available
    const nextResponseIndex = responseIndex;
    if (responseTemplate && responseTemplate.responses[nextResponseIndex]) {
      setIsTyping(true);
      setTimeout(() => {
        addMessage(chat.id, {
          content: responseTemplate.responses[nextResponseIndex].assistant,
          timestamp: new Date(),
          isUser: false,
        });
        setResponseIndex(nextResponseIndex + 1);
        setIsTyping(false);
      }, 1200);
    }
  };

  if (!chat) return null;

  return (
    <div className="flex flex-col h-full justify-end">
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
        {chat.messages.map((message, idx) => (
          <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-sm text-base ${message.isUser ? 'bg-green-600 text-white' : 'bg-white text-gray-900 border border-gray-200'} transition-all duration-300`}>
              {message.content}
            </div>
          </div>
        ))}
        {/* Support links after first assistant response */}
        {chat.messages.length > 1 && supportLinks.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {supportLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-green-100 border border-gray-200"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
        {isTyping && (
          <div className="flex items-center gap-2 mt-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-gray-400 text-xs">Agent is typing...</span>
          </div>
        )}
      </div>
      <div className="border-t px-2 py-3 bg-white">
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}
