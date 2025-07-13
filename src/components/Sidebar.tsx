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

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
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
        <div className="px-4 mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Recent
          </h3>
          <Link href="#" className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-50">
            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-green-500 mr-3" />
            <span>New Task</span>
          </Link>
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
