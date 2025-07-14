"use client";

import { useState, useEffect, useRef } from 'react';
import { useChatStore, ChatMessage } from '@/store/chatStore';
import { getChatResponseByTask } from '@/data/chatResponses';
import { ChatInput } from './ChatInput';

export function ChatTimeline() {
  const { chats, activeChat, addMessage } = useChatStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0);
  
  // Find the active chat
  const chat = chats.find(c => c.id === activeChat);
  
  // Get the appropriate response template based on the chat title
  const responseTemplate = chat ? getChatResponseByTask(chat.title) : null;
  
  const steps = responseTemplate?.steps || [
    { status: 'complete', text: 'Thinking...', delay: 0 },
    { status: 'complete', text: 'Searching company database', delay: 1000 },
    { status: 'complete', text: 'Contacting support', delay: 2000 },
    { status: 'current', text: 'Generating response', delay: 3000 },
  ];

  const supportLinks = responseTemplate?.supportLinks || [
    { name: 'Amazon Help', url: '#' },
    { name: 'IRS Support', url: '#' },
    { name: 'Flipkart Returns', url: '#' },
  ];

  // Use a ref to track if initial messages have been added
  const initialMessagesAdded = useRef(false);
  
  // Effect to simulate the chat progression
  useEffect(() => {
    if (!chat || !responseTemplate) return;
    
    // If there are no messages yet, add the initial assistant message
    if (chat.messages.length === 0 && !initialMessagesAdded.current) {
      // Mark that we've added initial messages to prevent duplicates
      initialMessagesAdded.current = true;
      
      // Add initial message
      addMessage(chat.id, {
        content: responseTemplate.initialMessage,
        timestamp: new Date(),
        isUser: false
      });
      
      // Add the first response after steps complete
      const timer = setTimeout(() => {
        if (responseTemplate.responses[0]) {
          addMessage(chat.id, {
            content: responseTemplate.responses[0].assistant,
            timestamp: new Date(),
            isUser: false
          });
          setShowInput(true);
        }
      }, 5000); // Show first response after steps animation
      
      return () => clearTimeout(timer);
    } else if (chat.messages.length > 0 && !showInput) {
      // If we already have messages but input isn't shown yet, show it
      setShowInput(true);
    }
  }, [chat, responseTemplate, addMessage]);
  
  // Handle user message submission
  const handleSendMessage = (message: string) => {
    if (!chat) return;
    
    // Add user message
    addMessage(chat.id, {
      content: message,
      timestamp: new Date(),
      isUser: true
    });
    
    // Get next response from template if available
    const nextResponseIndex = responseIndex + 1;
    if (responseTemplate && responseTemplate.responses[nextResponseIndex]) {
      // Simulate typing delay
      setTimeout(() => {
        addMessage(chat.id, {
          content: responseTemplate.responses[nextResponseIndex].assistant,
          timestamp: new Date(),
          isUser: false
        });
        setResponseIndex(nextResponseIndex);
      }, 1000);
    }
  };

  return (
    <div className="mt-8 space-y-4 animate-fadeIn">
      {/* Display chat messages */}
      {chat && chat.messages.map((message, idx) => (
        <div key={message.id} className={`flex items-start space-x-3 ${message.isUser ? 'justify-end' : ''}`}>
          {!message.isUser && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
              <span className="text-lg">🤖</span>
            </div>
          )}
          <div className={`flex-1 ${message.isUser ? 'text-right' : ''}`}>
            <div className={`inline-block rounded-lg p-4 shadow-sm ${message.isUser ? 'bg-green-500 text-white' : 'bg-white text-gray-900'}`}>
              <p className="text-sm">{message.content}</p>
            </div>
            
            {/* Show steps after first assistant message */}
            {idx === 0 && !message.isUser && (
              <div className="mt-4 space-y-3">
                {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3"
                    style={{ 
                      opacity: 0,
                      animation: `fadeIn 0.5s ease-out forwards ${step.delay}ms`
                    }}
                  >
                    <div
                      className={`h-2 w-2 rounded-full ${
                        step.status === 'complete'
                          ? 'bg-green-500'
                          : step.status === 'current'
                          ? 'animate-pulse bg-green-500'
                          : 'bg-gray-300'
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        step.status === 'pending' ? 'text-gray-500' : 'text-gray-900'
                      }`}
                    >
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Show support links after first assistant response */}
            {idx === 1 && !message.isUser && (
              <div 
                className="mt-4 flex flex-wrap gap-2"
                style={{ 
                  opacity: 0,
                  animation: 'fadeIn 0.5s ease-out forwards 500ms'
                }}
              >
                {supportLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 
                             transition-colors duration-200"
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
      
      {/* Chat input */}
      {showInput && chat && (
        <div className="mt-6">
          <ChatInput onSend={handleSendMessage} />
        </div>
      )}
    </div>
  );
}
