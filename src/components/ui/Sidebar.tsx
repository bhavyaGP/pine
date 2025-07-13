"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface User {
  name: string;
  email: string;
  avatar: string;
}

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentTasks] = useState([
    { id: 1, title: 'Track Amazon Order', status: 'active' },
    { id: 2, title: 'Netflix Subscription', status: 'completed' },
  ]);
  
  const user: User = {
    name: 'Bhavya',
    email: 'bhavya@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bhavya'
  };

  return (
    <aside
      className={clsx(
        'bg-white border-r border-gray-200 flex flex-col transition-all duration-300',
        isExpanded ? 'w-64' : 'w-20'
      )}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-5 z-10 rounded-full border border-gray-200 bg-white p-1.5 shadow-sm hover:bg-gray-50"
      >
        <svg
          className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      {/* Logo */}
      <div className="p-4 flex items-center">
        <Image src="/globe.svg" alt="Pine Logo" width={32} height={32} className="flex-shrink-0" />
        {isExpanded && (
          <span className="ml-3 text-xl font-semibold text-gray-900">pine</span>
        )}
      </div>

      {/* New Task Button */}
      <button className="mx-4 mb-6 flex items-center justify-center bg-green-700 hover:bg-green-800 text-white rounded-lg py-2 px-4">
        <PlusIcon className="h-5 w-5" />
        {isExpanded && <span className="ml-2">New Task</span>}
      </button>

      {/* Search */}
      <div className="px-4 mb-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            className={clsx(
              'w-full bg-gray-50 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-500',
              'focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white'
            )}
          />
        </div>
      </div>

      {/* Recent Section */}
      {isExpanded && (
        <div className="px-4 mb-6 animate-slideDown">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Recent
          </h3>
          {recentTasks.map((task) => (
            <Link
              key={task.id}
              href="#"
              className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-50 group mb-1 transition-all duration-200"
            >
              <div
                className={clsx(
                  "flex-shrink-0 w-2 h-2 rounded-full mr-3",
                  task.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                )}
              />
              <span className="truncate group-hover:text-green-600 transition-colors duration-200">
                {task.title}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* User Profile */}
      <div className="mt-auto p-4 border-t border-gray-200">
        <div className="flex items-center">
          <Image
            src={user.avatar}
            alt={user.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          {isExpanded && (
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
