"use client";

import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { MicrophoneIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { TaskCard } from './ui/TaskCard';
import { ChatInput } from './ui/ChatInput';
import { ChatTimeline } from './ui/ChatTimeline';

export default function MainContent() {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('recommended');
  const now = DateTime.now().setLocale('en');
  const greeting = `${now.toFormat('ccc')}, ${now.toFormat('hh:mm a')}`;
  
  const categories = [
    { name: 'Recommended', id: 'recommended' },
    { name: 'Order Help', id: 'order' },
    { name: 'Complaints', id: 'complaints' },
    { name: 'Product Search', id: 'products' },
    { name: 'Other Tasks', id: 'other' }
  ];

  const handleTaskClick = (taskId: number) => {
    setSelectedTask(String(taskId));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsTyping(true);
    clearTimeout((window as any).typeTimer);
    (window as any).typeTimer = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const tasks = {
    recommended: [
      { id: 1, title: 'Track My Order', icon: '🛍', platform: 'Amazon', status: 'In Progress' },
      { id: 2, title: 'Cancel Subscription', icon: '🚫', platform: 'Netflix', status: 'Resolved' },
      { id: 3, title: 'Raise a Complaint', icon: '💬', platform: 'Flipkart', status: '$25 Saved' },
    ],
    order: [
      { id: 4, title: 'Find Order Status', icon: '📦', platform: 'Amazon', status: 'Open' },
      { id: 5, title: 'Return Item', icon: '↩️', platform: 'Flipkart', status: 'Open' },
      { id: 6, title: 'Track Shipment', icon: '🚚', platform: 'DHL', status: 'In Progress' },
    ],
    complaints: [
      { id: 7, title: 'Product Issue', icon: '⚠️', platform: 'Amazon', status: 'Open' },
      { id: 8, title: 'Delivery Problem', icon: '🚫', platform: 'Flipkart', status: 'Resolved' },
      { id: 9, title: 'Billing Dispute', icon: '💰', platform: 'PayPal', status: 'In Progress' },
    ],
    products: [
      { id: 10, title: 'Compare Prices', icon: '🔍', platform: 'Multiple', status: 'Open' },
      { id: 11, title: 'Find Similar', icon: '👀', platform: 'Amazon', status: 'Open' },
      { id: 12, title: 'Price Alert', icon: '🔔', platform: 'Flipkart', status: '$10 Drop' },
    ],
    other: [
      { id: 13, title: 'Talk to Support', icon: '☎️', platform: 'General', status: 'Available' },
      { id: 14, title: 'Fix Account', icon: '🔧', platform: 'Multiple', status: 'Open' },
      { id: 15, title: 'Get Help', icon: '❓', platform: 'Support', status: 'Open' },
    ],
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsTyping(true);
    const timeout = setTimeout(() => setIsTyping(false), 1000);
    return () => clearTimeout(timeout);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Handle message submission
      setInputValue('');
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header Section */}
      <div className="border-b border-gray-200 bg-white px-8 py-6 animate-slideDown">
        <div className="mb-4 text-sm text-gray-600">{greeting}</div>
        <h1 className="mb-1 text-2xl font-semibold text-gray-900">
          Hi, <em className="font-bold">Bhavya</em>
        </h1>
        <p className="text-gray-600 animate-fadeIn">How can I help you today?</p>
        
        {/* Search Input */}
        <form onSubmit={handleSubmit} className="mt-6 animate-slideUp">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={handleInput}
                placeholder="Please help me track my missing order"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 
                         focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                         transition-all duration-200"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <MicrophoneIcon className={`h-5 w-5 ${isTyping && "animate-pulse text-green-500"}`} />
              </button>
            </div>
            <button 
              type="submit"
              className="rounded-full p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                       transition-all duration-200 transform hover:scale-105"
              disabled={!inputValue}
            >
              <PaperAirplaneIcon className="h-5 w-5 rotate-90" />
            </button>
          </div>
        </form>
      </div>

      {/* Task Categories */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <Tab.Group onChange={(index) => setSelectedCategory(categories[index].id)}>
          <Tab.List className="flex space-x-4 border-b border-gray-200">
            {categories.map((category) => (
              <Tab
                key={category.id}
                className={({ selected }) =>
                  `${
                    selected
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } -mb-px border-b-2 px-3 py-2 text-sm font-medium outline-none transition-all duration-200`
                }
              >
                {category.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-6">
            {categories.map((category) => (
              <Tab.Panel
                key={category.id}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fadeIn"
              >
                {tasks[category.id as keyof typeof tasks].map((task, index) => (
                  <div
                    key={task.id}
                    className="animate-slideInLeft"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TaskCard task={task} />
                  </div>
                ))}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>

        {/* Chat Timeline */}
        <ChatTimeline />
      </div>

      {/* Chat Input */}
      <ChatInput 
        onSend={(message) => {
          // Handle message submission
          console.log('Message sent:', message);
        }}
      />
    </div>
  );
}
