"use client";

import { useState } from 'react';
import { DateTime } from 'luxon';
import { MicrophoneIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { TaskCard } from './ui/TaskCard';

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
  const now = DateTime.now().setLocale('en');
  const greeting = `${now.toFormat('ccc')}, ${now.toFormat('hh:mm a')}`;

  const handleTaskClick = (message: string) => {
    setInputValue(message);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsTyping(true);
    const timeout = setTimeout(() => setIsTyping(false), 1000);
    return () => clearTimeout(timeout);
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
    <div className="flex h-full flex-col bg-white">
      {/* Header Section */}
      <div className="border-b border-gray-200 bg-white px-8 py-6">
        <div className="mb-4 text-sm text-gray-500">{greeting}</div>
        <h1 className="mb-2 text-3xl font-semibold text-gray-900">
          Hi, <span className="font-normal">Nandit</span>
        </h1>
        <p className="text-xl text-gray-600">How can I help you today?</p>
        
        {/* Search Input */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={handleInput}
                placeholder="Type or select a task to work on..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 
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
              className="rounded-lg bg-green-600 p-3 text-white focus:outline-none focus:ring-2 
                       focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 
                       transform hover:bg-green-700 disabled:opacity-50 disabled:hover:bg-green-600"
              disabled={!inputValue}
            >
              <PaperAirplaneIcon className="h-5 w-5 rotate-90" />
            </button>
          </div>
        </form>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {showResponse ? (
          <div className="animate-pulse flex space-x-4 p-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex space-x-4">
              <button className="rounded-full bg-green-600 px-4 py-2 text-sm text-white">
                🎯 Recommended
              </button>
              <button className="rounded-full bg-yellow-100 px-4 py-2 text-sm text-yellow-800">
                💰 Save Money
              </button>
              <button className="rounded-full bg-red-100 px-4 py-2 text-sm text-red-800">
                🔧 Solve Problems
              </button>
              <button className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-800">
                📅 Book & Manage
              </button>
              <button className="rounded-full bg-purple-100 px-4 py-2 text-sm text-purple-800">
                ⚡️ Other more
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {PREDEFINED_TASKS.recommended.map((task, index) => (
                <div
                  key={task.id}
                  className="animate-slideInLeft"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleTaskClick(task.message)}
                >
                  <TaskCard task={task} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
