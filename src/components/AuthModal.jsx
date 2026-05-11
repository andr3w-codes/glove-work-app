import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function AuthModal({ onClose }) {
  const { signIn, signUp } = useAuth();
  const [tab, setTab] = useState('signup'); // 'signup' | 'login'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (tab === 'signup') {
        await signUp(email, password);
        setSuccess(true);
      } else {
        await signIn(email, password);
        onClose();
      }
    } catch (err) {
      setError(err.message ?? 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="w-full max-w-sm bg-[#23232a] border border-[#333642] rounded-xl shadow-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-100">
            {tab === 'signup' ? 'Save Your Progress' : 'Welcome Back'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-500 hover:text-gray-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {success ? (
          <div className="text-center py-4">
            <p className="text-2xl mb-2">🎉</p>
            <p className="text-gray-200 font-semibold mb-1">Account created!</p>
            <p className="text-gray-400 text-sm mb-4">Your progress is now saved across devices.</p>
            <button onClick={onClose} className="btn-primary w-full">Let's Play</button>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex mb-5 bg-[#18181b] rounded-lg p-1 gap-1">
              {['signup', 'login'].map(t => (
                <button
                  key={t}
                  onClick={() => { setTab(t); setError(null); }}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    tab === t ? 'bg-blue-700 text-white' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {t === 'signup' ? 'Create Account' : 'Log In'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1" htmlFor="auth-email">Email</label>
                <input
                  id="auth-email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 rounded-lg bg-[#18181b] border border-[#333642] text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1" htmlFor="auth-password">Password</label>
                <input
                  id="auth-password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full px-3 py-2 rounded-lg bg-[#18181b] border border-[#333642] text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm bg-red-900/30 border border-red-800 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full btn-primary text-sm ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Please wait…' : tab === 'signup' ? 'Create Account' : 'Log In'}
              </button>
            </form>

            {tab === 'signup' && (
              <p className="mt-4 text-xs text-gray-600 text-center">
                Your current progress will be linked to this account.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
