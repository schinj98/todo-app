import { useState, useEffect } from 'react';
import { createTask, updateTask } from '../utils/api';

const TaskForm = ({ editTask, onTaskSaved, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title,
        description: editTask.description || '',
        dueDate: editTask.dueDate?.split('T')[0] || '',
        priority: editTask.priority
      });
    }
  }, [editTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editTask) {
        await updateTask(editTask._id, formData);
      } else {
        await createTask(formData);
      }
      
      setFormData({ title: '', description: '', dueDate: '', priority: 'medium' });
      onTaskSaved();
    } catch (error) {
      alert('Error saving task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        {editTask ? 'Edit Task' : 'Add New Task'}
      </h3>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">Title</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">Description</label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">Due Date</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">Priority</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-blue-300"
        >
          {loading ? 'Saving...' : editTask ? 'Update Task' : 'Add Task'}
        </button>
        
        {editTask && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white py-2 px-6 rounded-lg hover:bg-gray-500 transition duration-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;