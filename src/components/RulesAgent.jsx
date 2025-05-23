import React, { useState } from 'react';
import { askQuestion } from '../api/rules';

const RulesAgent = () => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'ai',
      content: `<h2>Welcome to the Little League Rules Assistant!</h2>
        <p>Ask me any question about Little League baseball rules, pitch counts, infield fly, or other scenarios. I'll do my best to provide clear, official, and helpful answers.</p>
        <ul>
          <li>Try: <strong>What are the pitch count rules for 11-year-olds?</strong></li>
          <li>Try: <strong>Explain the infield fly rule</strong></li>
        </ul>
        <p>For official rules, see the resources below.</p>`,
      sources: []
    }
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    // Add user message to chat
    const userMessage = { type: 'user', content: question };
    setChatHistory(prev => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    try {
      const response = await askQuestion(question.trim());
      // Add AI response to chat
      const aiMessage = { 
        type: 'ai', 
        content: response.content,
        sources: response.sources
      };
      setChatHistory(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('Error getting answer:', err);
      setError(err.message || 'Sorry, I encountered an error while processing your question. Please try again.');
    } finally {
      setLoading(false);
      setQuestion('');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-2">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Little League Rules Assistant</h2>
        
        {/* Chat History */}
        <div className="mb-6 h-[60vh] overflow-y-auto border border-gray-200 rounded-lg p-4">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.type === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-3 rounded-lg max-w-[95vw] sm:max-w-[80%] text-sm sm:text-base ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#23232a] text-[#f3f4f6]'
                }`}
              >
                {message.type === 'ai' ? (
                  <>
                    <div 
                      className="prose max-w-none prose-pre:whitespace-pre-wrap prose-pre:break-words prose-pre:overflow-x-auto prose-pre:bg-gray-50 prose-pre:p-2 prose-pre:rounded"
                      style={{ 
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word'
                      }}
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Sources:</h4>
                        <ul className="space-y-1">
                          {message.sources.map((source, idx) => (
                            <li key={idx}>
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm break-words"
                              >
                                {source.title} →
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="break-words">{message.content}</p>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-center my-4">
              <div className="inline-block animate-pulse text-gray-500">Thinking...</div>
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about little league rules..."
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
              {loading ? 'Thinking...' : 'Send'}
            </button>
          </div>
        </form>

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