import React, { useState } from 'react';
import { askQuestion } from '../api/rules';

const RulesAgent = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await askQuestion(question.trim());
      setAnswer(data);
    } catch (err) {
      console.error('Error getting answer:', err);
      setError(err.message || 'Sorry, I encountered an error while processing your question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderMarkdown = (content) => {
    // Split content into lines
    const lines = content.split('\n');
    
    return lines.map((line, index) => {
      // Handle headers
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-bold text-gray-800 mt-4 mb-2">{line.replace('## ', '')}</h2>;
      }
      
      // Handle bullet points
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-4 text-gray-600">{line.replace('- ', '')}</li>;
      }
      
      // Handle code blocks
      if (line.startsWith('```')) {
        return null; // Skip the ``` markers
      }
      
      // Handle bold text
      const boldText = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Handle regular paragraphs
      if (line.trim()) {
        return <p key={index} className="text-gray-600 my-2" dangerouslySetInnerHTML={{ __html: boldText }} />;
      }
      
      return <br key={index} />;
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Baseball Rules Assistant</h2>
        
        <div className="mb-6">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question about baseball rules..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className={`px-4 py-2 rounded-lg text-white font-medium ${
                  loading || !question.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? 'Thinking...' : 'Ask'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {answer && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="prose max-w-none">
                {renderMarkdown(answer.content)}
              </div>
              {answer.sources && answer.sources.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Sources:</h4>
                  <ul className="space-y-1">
                    {answer.sources.map((source, index) => (
                      <li key={index}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          {source.title} →
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            This assistant uses AI to help answer your questions about baseball rules. For complete and official rules, please refer to the 
            <a 
              href="https://www.littleleague.org/playing-rules/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 ml-1"
            >
              Little League Official Rules
            </a>
            or download the Little League Rulebook App.
          </p>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Official Resources</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://www.littleleague.org/playing-rules/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Little League Official Rules Website
              </a>
            </li>
            <li>
              <a
                href="https://apps.apple.com/us/app/little-league-rulebook/id1450534064"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Little League Rulebook App (iOS)
              </a>
            </li>
            <li>
              <a
                href="https://play.google.com/store/apps/details?id=org.littleleague.rulebook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Little League Rulebook App (Android)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RulesAgent; 