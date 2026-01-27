import { useState } from 'react';
import { getDailySummary } from '../utils/api';

const DailySummary = () => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleGenerateSummary = async () => {
    setLoading(true);
    try {
      const data = await getDailySummary();
      setSummary(data.summary);
      setShowModal(true);
    } catch (error) {
      alert('Error generating summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleGenerateSummary}
        disabled={loading}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition duration-200 shadow-lg disabled:opacity-50"
      >
        {loading ? 'Generating...' : '✨ Generate Daily Summary'}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Today's Summary</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">{summary}</p>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(summary);
                  alert('Summary copied to clipboard!');
                }}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Copy
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DailySummary;