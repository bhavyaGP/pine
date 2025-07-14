"use client";


import { useState, useEffect, useRef } from 'react';
import { useChatStore, ChatMessage } from '@/store/chatStore';
import { getChatResponseByTask } from '@/data/chatResponses';
import { ChatInput } from './ChatInput';


export function ChatTimeline() {
  const { chats, activeChat, addMessage } = useChatStore();
  const [responseIndex, setResponseIndex] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const initialMessagesAdded = useRef(false);

  // Find the active chat
  const chat = chats.find(c => c.id === activeChat);
  // Get the appropriate response template based on the chat title
  const responseTemplate = chat ? getChatResponseByTask(chat.title) : null;
  const steps = responseTemplate?.steps || [];
  const supportLinks = responseTemplate?.supportLinks || [];

  // Simulate agentic AI: show steps, then initial message, then responses
  useEffect(() => {
    if (!chat || !responseTemplate) return;
    if (chat.messages.length === 0 && !initialMessagesAdded.current) {
      initialMessagesAdded.current = true;
      // Add initial message after steps animation
      setIsTyping(true);
      setTimeout(() => {
        addMessage(chat.id, {
          content: responseTemplate.initialMessage,
          timestamp: new Date(),
          isUser: false
        });
        setIsTyping(false);
        // Add first assistant response after a short delay
        setTimeout(() => {
          addMessage(chat.id, {
            content: responseTemplate.responses[0].assistant,
            timestamp: new Date(),
            isUser: false
          });
          setShowInput(true);
        }, 2000);
      }, 4000); // Steps animation duration
    } else if (chat.messages.length > 0 && !showInput) {
      setShowInput(true);
    }
  }, [chat, responseTemplate, addMessage]);

  // Handle user message submission
  const handleSendMessage = (message: string) => {
    if (!chat) return;
    addMessage(chat.id, {
      content: message,
      timestamp: new Date(),
      isUser: true
    });
    // Get next response from template if available
    const nextResponseIndex = responseIndex + 1;
    if (responseTemplate && responseTemplate.responses[nextResponseIndex]) {
      setIsTyping(true);
      setTimeout(() => {
        addMessage(chat.id, {
          content: responseTemplate.responses[nextResponseIndex].assistant,
          timestamp: new Date(),
          isUser: false
        });
        setResponseIndex(nextResponseIndex);
        setIsTyping(false);
      }, 1200);
    }
  };

  return (
    <div className="mt-8 space-y-4 animate-fadeIn">
      {/* Steps animation at the top if no messages yet */}
      {chat && chat.messages.length === 0 && (
        <div className="mb-6">
          <div className="flex flex-col gap-4">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${step.status === 'complete' ? 'bg-green-500' : step.status === 'current' ? 'animate-pulse bg-green-500' : 'bg-gray-300'}`}></div>
                <span className={`text-base ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>{step.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display chat messages */}
      {chat && chat.messages.map((message, idx) => (
        <div key={message.id} className={`flex items-start space-x-3 ${message.isUser ? 'justify-end' : ''}`}>
          {!message.isUser && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
              <span className="text-lg">🤖</span>
            </div>
          )}
          <div className={`flex-1 ${message.isUser ? 'text-right' : ''}`}>
            <div className={`inline-block rounded-xl p-4 shadow-md ${message.isUser ? 'bg-green-500 text-white' : 'bg-white text-gray-900'} transition-all duration-300`}>
              <p className="text-base leading-relaxed">{message.content}</p>
            </div>
            {/* Show support links after first assistant response */}
            {idx === 1 && !message.isUser && supportLinks.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {supportLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-green-100 transition-colors duration-200 border border-gray-200"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            )}
          </div>
          {message.isUser && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
              <span className="text-sm font-medium">You</span>
            </div>
          )}
        </div>
      ))}

      {/* Typing indicator for agentic AI */}
      {isTyping && (
        <div className="flex items-center gap-2 mt-2">
          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-gray-500 text-sm">Agent is typing...</span>
        </div>
      )}

      {/* Funky Chat input UI */}
      {showInput && chat && (
        <div className="mt-6 flex items-center justify-center">
          <div className="w-full max-w-xl bg-gradient-to-r from-green-200 via-green-100 to-green-300 rounded-2xl shadow-lg p-4 flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white font-bold text-lg animate-bounce">💬</div>
            <div className="flex-1">
              <ChatInput onSend={handleSendMessage} funky />
            </div>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white text-green-500 font-bold text-lg border-2 border-green-500 animate-spin">⚡</div>
          </div>
        </div>
      )}
    </div>
  );
}
