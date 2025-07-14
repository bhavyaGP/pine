"use client";

import { useState, useMemo, useCallback, useEffect } from 'react';
import { TaskCard } from './TaskCard';
import { useTaskStore } from '@/store/taskStore';

interface Task {
  id: number;
  title: string;
  icon: string;
  platform: string;
  status: string;
  message: string;
  createdAt?: Date;
}

type TaskCategory = 'recommended' | 'order-help' | 'complaints' | 'product-search' | 'other';

const TASK_CATEGORIES = [
  { id: 'recommended' as TaskCategory, label: 'Recommended', icon: '🎯', count: 4 },
  { id: 'order-help' as TaskCategory, label: 'Order Help', icon: '📦', count: 3 },
  { id: 'complaints' as TaskCategory, label: 'Complaints', icon: '⚠️', count: 3 },
  { id: 'product-search' as TaskCategory, label: 'Product Search', icon: '🔍', count: 3 },
  { id: 'other' as TaskCategory, label: 'Other Tasks', icon: '✨', count: 3 },
];

const DEFAULT_TASKS: Record<TaskCategory, Task[]> = {
  'recommended': [
    { id: 1, title: 'Track My Order', icon: '🛍', platform: 'Amazon', status: 'In Progress', message: 'Track your Amazon order status' },
    { id: 2, title: 'Cancel Subscription', icon: '🚫', platform: 'Netflix', status: '$25 Saved', message: 'Cancel your Netflix subscription' },
    { id: 3, title: 'Raise a Complaint', icon: '💬', platform: 'Flipkart', status: 'Open', message: 'Report an issue with your order' },
    { id: 4, title: 'Find Products Online', icon: '🛒', platform: 'Multiple Stores', status: 'Available', message: 'Search for products across stores' },
  ],
  'order-help': [
    { id: 5, title: 'Track Package', icon: '📦', platform: 'Amazon', status: 'In Progress', message: 'Track your package location' },
    { id: 6, title: 'Return Item', icon: '↩️', platform: 'Flipkart', status: 'Available', message: 'Initiate a return request' },
    { id: 7, title: 'Fix Delivery', icon: '🚚', platform: 'Multiple Stores', status: 'Open', message: 'Fix delivery issues' },
  ],
  'complaints': [
    { id: 8, title: 'Report Issue', icon: '⚠️', platform: 'Customer Service', status: 'Open', message: 'Report a product or service issue' },
    { id: 9, title: 'Refund Request', icon: '💰', platform: 'Amazon', status: 'In Progress', message: 'Request a refund' },
    { id: 10, title: 'Quality Complaint', icon: '📝', platform: 'Flipkart', status: 'Open', message: 'Report quality issues' },
  ],
  'product-search': [
    { id: 11, title: 'Compare Prices', icon: '🔍', platform: 'Multiple Stores', status: 'Available', message: 'Compare product prices' },
    { id: 12, title: 'Find Deals', icon: '🏷️', platform: 'Multiple Stores', status: '$40 Saved', message: 'Find the best deals' },
    { id: 13, title: 'Check Stock', icon: '📊', platform: 'Multiple Stores', status: 'Available', message: 'Check product availability' },
  ],
  'other': [
    { id: 14, title: 'Talk to Support', icon: '☎', platform: 'Customer Service', status: 'Available', message: 'Connect with customer support' },
    { id: 15, title: 'Save Money', icon: '💲', platform: 'Bills & Utilities', status: '$25 Saved', message: 'Find ways to save money' },
    { id: 16, title: 'General Help', icon: '❓', platform: 'Customer Service', status: 'Open', message: 'Get general assistance' },
  ],
};

const INITIAL_CATEGORIES = [
  { id: 'recommended' as TaskCategory, label: 'Recommended', icon: '🎯', count: 0 },
  { id: 'order-help' as TaskCategory, label: 'Order Help', icon: '📦', count: 0 },
  { id: 'complaints' as TaskCategory, label: 'Complaints', icon: '⚠️', count: 0 },
  { id: 'product-search' as TaskCategory, label: 'Product Search', icon: '🔍', count: 0 },
  { id: 'other' as TaskCategory, label: 'Other Tasks', icon: '✨', count: 0 },
];

export function TaskCategories() {
  const [activeTab, setActiveTab] = useState<TaskCategory>('recommended');
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const storeTasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);

  useEffect(() => {
    // Update categories with actual counts
    setCategories(INITIAL_CATEGORIES.map(cat => ({
      ...cat,
      count: DEFAULT_TASKS[cat.id].length + (storeTasks[cat.id]?.length || 0)
    })));
  }, [storeTasks]);

  const allTasks = useMemo(() => {
    const result: Record<TaskCategory, Task[]> = { ...DEFAULT_TASKS };
    
    Object.entries(storeTasks).forEach(([category, tasks]) => {
      if (category in result) {
        // Ensure proper sorting and deduplication by ID
        const existingIds = new Set(result[category as TaskCategory].map(t => t.id));
        const newTasks = tasks.filter(t => !existingIds.has(t.id));
        
        result[category as TaskCategory] = [
          ...result[category as TaskCategory],
          ...newTasks
        ].sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0));
      }
    });
    
    return result;
  }, [storeTasks]);

  // Open chat for agentic AI instead of adding another card
  const { addChat, setActiveChat } = require('@/store/chatStore').useChatStore.getState();
  const handleTaskClick = useCallback((task: Task) => {
    setIsLoading(true);
    // Create a new chat for this tool/task
    const chatId = addChat({
      title: task.title,
      messages: [],
      createdAt: new Date(),
      taskId: task.id
    });
    setActiveChat(chatId);
    setIsLoading(false);
  }, [addChat, setActiveChat]);

  return (
    <div className="w-full space-y-6 max-w-full">
      {/* Category Tabs */}
      <div className="mb-4 sm:mb-6 flex flex-wrap gap-2 sm:gap-3 no-scrollbar overflow-x-auto pb-2 px-2 sm:px-6">
        {TASK_CATEGORIES.map((category) => {
          const taskCount = allTasks[category.id]?.length ?? 0;
          return (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              disabled={isLoading}
              className={`group relative flex items-center space-x-1 sm:space-x-2 whitespace-nowrap rounded-lg px-2 sm:px-4 py-1 sm:py-2 
                        transition-all duration-300 hover:shadow-md disabled:opacity-50 text-xs sm:text-sm
                        ${activeTab === category.id
                          ? 'bg-green-100 text-green-700 shadow-sm'
                          : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                        }`}
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                {category.icon}
              </span>
              <span className="text-sm font-medium">{category.label}</span>
              <span className="ml-1 sm:ml-2 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-gray-100 
                             text-xs font-medium text-gray-600 group-hover:bg-gray-200">
                {taskCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Task Cards Grid */}
      <div className="relative grid auto-rows-fr grid-cols-1 gap-3 sm:gap-4 px-2 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-sm">
            <div className="rounded-lg bg-white p-4 shadow-lg">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-200 border-t-green-600"></div>
            </div>
          </div>
        )}
        {allTasks[activeTab]?.map((task, index) => (
          <div 
            key={task.id}
            className="opacity-0 animate-[slideIn_0.3s_ease-out_forwards]"
            style={{ 
              animationDelay: `${index * 0.1}s`,
            }}
            onClick={() => !isLoading && handleTaskClick(task)}
          >
            <div 
              className={`w-full transition-all duration-200 hover:scale-[1.02]
                       ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <TaskCard task={task} asButton={false} />
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {(!allTasks[activeTab] || allTasks[activeTab].length === 0) && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <span className="text-4xl mb-4">🤔</span>
          <h3 className="text-lg font-medium text-gray-900">No tasks found</h3>
          <p className="mt-2 text-sm text-gray-500">
            There are no tasks in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}