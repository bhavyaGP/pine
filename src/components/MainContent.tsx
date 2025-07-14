"use client";

import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { MicrophoneIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { TaskCategories } from './ui/TaskCategories';
import { ChatTimeline } from './ui/ChatTimeline';

const PREDEFINED_TASKS = {
  recommended: [
    { id: 1, title: 'Lower a bill', icon: '💰', platform: 'T-Mobile', status: '$25 Saved', message: "I'd like to lower my T-Mobile bill" },
    { id: 2, title: 'Raise a complaint', icon: '⚠️', platform: 'Service Issues', status: 'Open', message: "I need to file a complaint about a service issue" },
    { id: 3, title: 'Cancel a subscription', icon: '🚫', platform: 'Subscription Services', status: 'Open', message: "I want to cancel my subscription" },
    { id: 4, title: 'Let me handle that for you', icon: '🤝', platform: 'General Help', status: 'Available', message: "I need assistance with a task" },
  ]
};

export default function MainContent() {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const now = DateTime.now().setLocale('en');
    setGreeting(`${now.toFormat('ccc')}, ${now.toFormat('hh:mm a')}`);
    
    // Update time every minute
    const timer = setInterval(() => {
      const now = DateTime.now().setLocale('en');
      setGreeting(`${now.toFormat('ccc')}, ${now.toFormat('hh:mm a')}`);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleTaskClick = (message: string) => {
    setInputValue(message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setShowResponse(true);
      setInputValue('');
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowResponse(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-beige-50">
      {/* Header Section */}
      <div className="border-b border-gray-200 bg-white px-4 sm:px-6 md:px-8 py-4 sm:py-6">
        <div className="mb-2 sm:mb-4 text-xs sm:text-sm text-gray-500">{greeting}</div>
        <h1 className="mb-1 sm:mb-2 text-2xl sm:text-3xl font-semibold text-gray-900">
          Hi, <span className="italic font-bold">Bhavya</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600">How can I help you today?</p>
        
        {/* Search Input */}
        <form onSubmit={handleSubmit} className="mt-4 sm:mt-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setIsTyping(true);
                  const timeout = setTimeout(() => setIsTyping(false), 1000);
                  return () => clearTimeout(timeout);
                }}
                placeholder="Please help me track my missing order..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-900 
                         placeholder-gray-500 focus:border-green-500 focus:bg-white focus:outline-none 
                         focus:ring-1 focus:ring-green-500 transition-all duration-200"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 
                         transition-colors"
              >
                <MicrophoneIcon className={`h-5 w-5 ${isTyping && "animate-pulse text-green-500"}`} />
              </button>
            </div>
            <button 
              type="submit"
              className="rounded-full bg-green-600 p-3 text-white hover:bg-green-700 focus:outline-none 
                       focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200
                       disabled:opacity-50 disabled:hover:bg-green-600"
              disabled={!inputValue}
            >
              <PaperAirplaneIcon className="h-5 w-5 rotate-90" />
            </button>
          </div>
        </form>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">
        {showResponse ? (
          <ChatTimeline />
        ) : (
          <div className="space-y-4 sm:space-y-8">
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              <TaskCategories />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
