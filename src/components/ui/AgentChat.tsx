"use client";
const { setActiveChat } = require('@/store/chatStore').useChatStore.getState();

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
      {/* Back Button */}
      <div className="flex items-center px-2 pt-2 pb-1">
        <button
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 hover:bg-green-100 text-green-700 text-sm font-medium shadow-sm border border-gray-200 transition-all duration-200"
          onClick={() => setActiveChat(null)}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>
      </div>
      {/* Agent avatar and tool call effect */}
      <div className="flex items-center gap-3 px-4 py-2">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white text-xl font-bold animate-bounce shadow-lg">
          🤖
        </div>
        <div className="flex-1">
          <span className="text-green-700 font-semibold text-base animate-pulse">{chat.title} agent is searching tools & making decisions...</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
        {chat.messages.map((message, idx) => (
          <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} items-end`}>
            {!message.isUser && (
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 text-green-700 text-lg font-bold mr-2 animate-fadeIn">
                🤖
              </div>
            )}
            <div className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-md text-base ${message.isUser ? 'bg-green-600 text-white' : 'bg-white text-gray-900 border border-green-200'} transition-all duration-300 animate-fadeIn`}
                 style={{ boxShadow: message.isUser ? '0 2px 8px rgba(34,197,94,0.08)' : '0 2px 8px rgba(34,197,94,0.04)' }}>
              {message.content}
            </div>
            {message.isUser && (
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-500 text-white text-xs font-bold ml-2 animate-fadeIn">
                You
              </div>
            )}
          </div>
        ))}
        {/* Support links after first assistant response */}
        {chat.messages.length > 1 && supportLinks.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2 animate-fadeIn">
            {supportLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-green-100 border border-gray-200 shadow-sm"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
        {isTyping && (
          <div className="flex items-center gap-2 mt-2 animate-fadeIn">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-green-500 text-xs font-semibold">Agent is thinking...</span>
          </div>
        )}
      </div>
      <div className="border-t px-2 py-3 bg-white">
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}
