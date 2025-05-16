import { useState } from 'react';

const RulesAgent = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call to rules service
      // For now, we'll simulate a response
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            answer: "This is a placeholder response. The actual rules service will be implemented in the next phase.",
            ruleReference: "Rule 1.00"
          });
        }, 1000);
      });

      setAnswer(response.answer);
    } catch (err) {
      setError('Failed to get answer. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Little League Rules Assistant</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
            Ask a question about Little League rules:
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            placeholder="e.g., What is the infield fly rule?"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className={`w-full px-4 py-2 rounded-md text-white font-medium ${
            loading || !question.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Getting Answer...' : 'Ask Question'}
        </button>
      </form>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {answer && (
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Answer:</h3>
          <p className="text-gray-700 mb-2">{answer}</p>
          <p className="text-sm text-gray-500">
            Reference: Rule 1.00
          </p>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Example Questions:</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>What is the infield fly rule?</li>
          <li>How many innings are in a Little League game?</li>
          <li>What is the mercy rule?</li>
          <li>Can a runner advance on a caught foul ball?</li>
          <li>What is the dropped third strike rule?</li>
        </ul>
      </div>
    </div>
  );
};

export default RulesAgent; 