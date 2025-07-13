interface Task {
  id: number;
  title: string;
  icon: string;
  platform: string;
  status: string;
  message: string;
}

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'open':
        return 'bg-gray-100 text-gray-800';
      case 'available':
        return 'bg-green-100 text-green-800';
      default:
        if (status.includes('$')) {
          return 'bg-purple-100 text-purple-800';
        }
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <button
      className="group flex w-full items-center justify-between rounded-lg border border-gray-200 
                bg-white p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
      <div className="flex items-center space-x-4">
        <span className="text-2xl transform transition-transform duration-300 group-hover:scale-110">
          {task.icon}
        </span>
        <div className="text-left">
          <h3 className="font-medium text-gray-900 transition-colors duration-200 group-hover:text-green-600">
            {task.title}
          </h3>
          <p className="text-sm text-gray-500 transition-opacity duration-200 group-hover:opacity-75">
            {task.platform}
          </p>
        </div>
      </div>
      {task.status && (
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 
                     ${getStatusColor(task.status)} group-hover:shadow-sm`}
        >
          {task.status}
        </span>
      )}
    </button>
  );
}
