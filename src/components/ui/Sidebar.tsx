"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MagnifyingGlassIcon, 
  PlusIcon,
  ChevronDownIcon,
  UserCircleIcon,
  CogIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useTaskStore } from '@/store/taskStore';
import { DateTime } from 'luxon';

interface User {
  name: string;
  email: string;
  avatar: string;
}

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  
  const recentTasks = useTaskStore(state => state.getRecentTasks());
  const addTask = useTaskStore(state => state.addTask);

  useEffect(() => {
    // Set user data on client side only
    setUser({
      name: 'Bhavya',
      email: 'bhavya@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bhavya'
    });
  }, []);

  const handleNewTask = () => {
    const newTask = {
      title: 'New Custom Task',
      icon: '📝',
      platform: 'Custom',
      status: 'Open',
      message: 'Custom task created by user',
    };
    addTask('other', newTask);
  };

  const formatTimeAgo = (date: Date) => {
    return DateTime.fromJSDate(date).toRelative();
  };

  // Avoid rendering user-specific content until user data is loaded
  if (!user) {
    return null;
  }

  return (
    <aside
      className={clsx(
        'flex h-full flex-col border-r border-gray-200 bg-white transition-all duration-300',
        isExpanded ? 'w-64' : 'w-20'
      )}
    >
      {/* Logo */}
      <div className="flex items-center p-4">
        <div className="relative h-8 w-8">
          <Image src="/globe.svg" alt="Pine Logo" fill className="object-contain" />
        </div>
        {isExpanded && (
          <span className="ml-3 text-xl font-semibold text-gray-900">pine</span>
        )}
      </div>

      {/* New Task Button */}
      <button 
        onClick={handleNewTask}
        className="mx-4 mb-6 flex items-center justify-center rounded-lg bg-green-700 px-4 py-2 
                 text-white transition-all duration-200 hover:bg-green-800 hover:shadow-md"
      >
        <PlusIcon className="h-5 w-5" />
        {isExpanded && <span className="ml-2">New Task</span>}
      </button>

      {/* Search */}
      <div className="px-4 mb-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            className={clsx(
              'w-full rounded-lg bg-gray-50 pl-10 pr-4 py-2 text-sm text-gray-900',
              'placeholder-gray-500 transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white'
            )}
          />
        </div>
      </div>

      {/* Recent Section */}
      {isExpanded && (
        <div className="px-4 mb-6 flex-1 overflow-y-auto">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Recent
          </h3>
          <div className="space-y-1">
            {recentTasks.map((task) => (
              <Link
                key={task.id}
                href="#"
                className="group flex items-center justify-between rounded-lg p-2 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <span className="mr-3">{task.icon}</span>
                  <span className="text-sm text-gray-700 group-hover:text-green-600 
                                 transition-colors duration-200">
                    {task.title}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {formatTimeAgo(task.createdAt)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* User Profile */}
      <div className="relative border-t border-gray-200 p-4">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex w-full items-center justify-between rounded-lg p-2 hover:bg-gray-50
                    transition-colors duration-200"
        >
          <div className="flex items-center">
            <Image
              src={user.avatar}
              alt={user.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            {isExpanded && (
              <div className="ml-3 text-left">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            )}
          </div>
          {isExpanded && (
            <ChevronDownIcon
              className={`h-5 w-5 text-gray-400 transition-transform duration-200
                         ${showDropdown ? 'rotate-180' : ''}`}
            />
          )}
        </button>

        {/* Dropdown Menu */}
        {showDropdown && isExpanded && (
          <div className="absolute bottom-full left-0 mb-2 w-full animate-slideUp">
            <div className="mx-4 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 
                            hover:bg-gray-100"
                >
                  <UserCircleIcon className="mr-3 h-5 w-5" />
                  Profile
                </button>
                <button
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 
                            hover:bg-gray-100"
                >
                  <CogIcon className="mr-3 h-5 w-5" />
                  Settings
                </button>
                <button
                  className="flex w-full items-center px-4 py-2 text-sm text-red-600 
                            hover:bg-gray-100"
                >
                  <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
