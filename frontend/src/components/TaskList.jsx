import { updateTask, deleteTask } from '../utils/api';

const TaskList = ({ tasks, onTaskUpdated, onTaskEdit }) => {
  const handleToggleComplete = async (task) => {
    try {
      await updateTask(task._id, { completed: !task.completed });
      onTaskUpdated();
    } catch (error) {
      alert('Error updating task');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        onTaskUpdated();
      } catch (error) {
        alert('Error deleting task');
      }
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const groupTasksByCategory = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const categorized = {
      today: [],
      upcoming: [],
      completed: []
    };

    tasks.forEach(task => {
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);

      if (task.completed) {
        categorized.completed.push(task);
      } else if (taskDate.getTime() === today.getTime()) {
        categorized.today.push(task);
      } else {
        categorized.upcoming.push(task);
      }
    });

    return categorized;
  };

  const renderTask = (task) => (
    <div
      key={task._id}
      className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
        task.completed ? 'border-green-500 opacity-60' : 'border-blue-500'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </div>
          
          {task.description && (
            <p className="mt-2 text-gray-600 ml-8">{task.description}</p>
          )}
          
          <div className="mt-2 ml-8 text-sm text-gray-500">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onTaskEdit(task)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(task._id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  const categorized = groupTasksByCategory();

  return (
    <div className="space-y-6">
      {categorized.today.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            Today's Focus
            <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
              {categorized.today.length}
            </span>
          </h2>
          <div className="space-y-3">
            {categorized.today.map(renderTask)}
          </div>
        </div>
      )}

      {categorized.upcoming.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            Upcoming
            <span className="bg-purple-600 text-white text-sm px-3 py-1 rounded-full">
              {categorized.upcoming.length}
            </span>
          </h2>
          <div className="space-y-3">
            {categorized.upcoming.map(renderTask)}
          </div>
        </div>
      )}

      {categorized.completed.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            Completed
            <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full">
              {categorized.completed.length}
            </span>
          </h2>
          <div className="space-y-3">
            {categorized.completed.map(renderTask)}
          </div>
        </div>
      )}

      {tasks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No tasks yet. Create your first task above!
        </div>
      )}
    </div>
  );
};

export default TaskList;