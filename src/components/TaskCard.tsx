interface Task {
  id: number;
  title: string;
  icon: string;
  platform: string;
  status: string;
}

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <button className="group flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-lg">
      <div className="flex items-center space-x-4">
        <span className="text-2xl">{task.icon}</span>
        <div className="text-left">
          <h3 className="font-medium text-gray-900 group-hover:text-green-600">
            {task.title}
          </h3>
          <p className="text-sm text-gray-500">{task.platform}</p>
        </div>
      </div>
      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
        {task.status}
      </span>
    </button>
  );
}
