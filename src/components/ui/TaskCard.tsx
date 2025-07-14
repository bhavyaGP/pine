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
  asButton?: boolean;
}

export function TaskCard({ task, asButton = true }: TaskCardProps) {
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

  const commonClassNames = "group flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-2 sm:p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] overflow-hidden";
                
  const buttonClassNames = `${commonClassNames} focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`;
  
  return asButton ? (
    <button
      className={buttonClassNames}
    >
      <div className="flex items-center space-x-2 sm:space-x-4 flex-grow min-w-0">
        <span className="text-xl sm:text-2xl flex-shrink-0 transform transition-transform duration-300 group-hover:scale-110">
          {task.icon}
        </span>
        <div className="text-left min-w-0 flex-grow overflow-hidden">
          <h3 className="font-medium text-gray-900 transition-colors duration-200 group-hover:text-green-600 text-sm sm:text-base truncate">
            {task.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 transition-opacity duration-200 group-hover:opacity-75 truncate">
            {task.platform}
          </p>
        </div>
      </div>
      {task.status && (
        <span
          className={`rounded-full px-2 sm:px-3 py-1 text-xs font-medium transition-all duration-300 
                     ${getStatusColor(task.status)} group-hover:shadow-sm ml-1 sm:ml-2 flex-shrink-0 whitespace-nowrap`}
        >
          {task.status}
        </span>
      )}
    </button>
  ) : (
    <div
      className={commonClassNames}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center space-x-2 sm:space-x-4 flex-grow min-w-0">
        <span className="text-xl sm:text-2xl flex-shrink-0 transform transition-transform duration-300 group-hover:scale-110">
          {task.icon}
        </span>
        <div className="text-left min-w-0 flex-grow overflow-hidden">
          <h3 className="font-medium text-gray-900 transition-colors duration-200 group-hover:text-green-600 text-sm sm:text-base truncate">
            {task.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 transition-opacity duration-200 group-hover:opacity-75 truncate">
            {task.platform}
          </p>
        </div>
      </div>
      {task.status && (
        <span
          className={`rounded-full px-2 sm:px-3 py-1 text-xs font-medium transition-all duration-300 
                     ${getStatusColor(task.status)} group-hover:shadow-sm ml-1 sm:ml-2 flex-shrink-0 whitespace-nowrap`}
        >
          {task.status}
        </span>
      )}
    </div>
  );
}
