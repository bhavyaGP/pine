"use client";

import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { MicrophoneIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { TaskCategories } from './ui/TaskCategories';
import { AgentChat } from './ui/AgentChat';

const PREDEFINED_TASKS = {
  recommended: [
    { id: 1, title: 'Lower a bill', icon: '💰', platform: 'T-Mobile', status: '$25 Saved', message: "I'd like to lower my T-Mobile bill" },
    { id: 2, title: 'Raise a complaint', icon: '⚠️', platform: 'Service Issues', status: 'Open', message: "I need to file a complaint about a service issue" },
    { id: 3, title: 'Cancel a subscription', icon: '🚫', platform: 'Subscription Services', status: 'Open', message: "I want to cancel my subscription" },
    { id: 4, title: 'Let me handle that for you', icon: '🤝', platform: 'General Help', status: 'Available', message: "I need assistance with a task" },
  ]
};

export default function MainContent() {
  const [greeting, setGreeting] = useState('');
  const { activeChat } = require('@/store/chatStore').useChatStore();

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

  return (
    <div className="flex h-full flex-col bg-beige-50">
      {/* Header Section */}
      <div className="border-b border-gray-200 bg-white px-4 sm:px-6 md:px-8 py-4 sm:py-6">
        <div className="mb-2 sm:mb-4 text-xs sm:text-sm text-gray-500">{greeting}</div>
        <h1 className="mb-1 sm:mb-2 text-2xl sm:text-3xl font-semibold text-gray-900">
          Hi, <span className="italic font-bold">Bhavya</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600">How can I help you today?</p>
        
      {/* Removed top chat input box for agentic UI */}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">
        <div className="space-y-4 sm:space-y-8">
          {!activeChat ? (
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              <TaskCategories />
            </div>
          ) : (
            <AgentChat chatId={activeChat} />
          )}
        </div>
      </div>
    </div>
  );
}
