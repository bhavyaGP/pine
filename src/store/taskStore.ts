import { create } from 'zustand';

interface Task {
  id: number;
  title: string;
  icon: string;
  platform: string;
  status: string;
  message: string;
  createdAt: Date;
}

interface TaskStore {
  tasks: Record<string, Task[]>;
  addTask: (category: string, task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (category: string, task: Task) => void;
  removeTask: (category: string, taskId: number) => void;
  getRecentTasks: () => Task[];
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: {
    'recommended': [],
    'order-help': [],
    'complaints': [],
    'product-search': [],
    'other': [],
  },
  addTask: (category, task) => set((state) => {
    const newTask = {
      ...task,
      id: Math.max(0, ...Object.values(state.tasks).flat().map(t => t.id)) + 1,
      createdAt: new Date(),
    };
    return {
      tasks: {
        ...state.tasks,
        [category]: [...(state.tasks[category] || []), newTask],
      },
    };
  }),
  updateTask: (category, updatedTask) => set((state) => ({
    tasks: {
      ...state.tasks,
      [category]: state.tasks[category].map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    },
  })),
  removeTask: (category, taskId) => set((state) => ({
    tasks: {
      ...state.tasks,
      [category]: state.tasks[category].filter((task) => task.id !== taskId),
    },
  })),
  getRecentTasks: () => {
    const state = get();
    return Object.values(state.tasks)
      .flat()
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5);
  },
}));
