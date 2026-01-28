import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSummaries } from '../utils/api';

const SummaryHistory = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchSummaries();
  }, []);

  const fetchSummaries = async () => {
    try {
      const data = await getSummaries();
      setSummaries(data);
    } catch (error) {
      console.error('Error fetching summaries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Summary History</h1>
            <p className="text-gray-600">Welcome, {user.name}!</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Back to Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Progress Journey</h2>
          <p className="text-gray-600">Track your daily accomplishments and stay motivated!</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : summaries.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Summaries Yet</h3>
            <p className="text-gray-600 mb-6">Complete some tasks and generate your first daily summary!</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {summaries.map((summary) => (
              <div
                key={summary._id}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {formatDate(summary.date)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {summary.taskCount} task{summary.taskCount !== 1 ? 's' : ''} completed
                    </p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                    Completed
                  </span>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                    {summary.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryHistory;