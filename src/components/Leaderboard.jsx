import { useState, useEffect } from 'react';
import { db } from '../db/clientConfig';

const RANK_MEDALS = ['🥇', '🥈', '🥉'];

const Leaderboard = ({ currentUserId }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await db.getLeaderboard();
        setScores(data);
      } catch (err) {
        setError('Failed to load leaderboard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/40 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-100">🏆 Leaderboard</h2>

      {scores.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-[#23232a] rounded-lg border border-[#333642]">
          No scores yet. Start playing to appear here!
        </div>
      ) : (
        <div className="bg-[#23232a] border border-[#333642] rounded-lg overflow-hidden overflow-x-auto shadow">
          <table className="min-w-full">
            <thead className="bg-[#2d2d38]">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Rank</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Player</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Score</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Completed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#333642]">
              {scores.map((score, index) => (
                <tr
                  key={score.id}
                  className={
                    score.user_id === currentUserId
                      ? 'bg-blue-900/30 border-l-2 border-blue-500'
                      : index < 3
                      ? 'bg-yellow-900/20'
                      : 'hover:bg-white/5 transition-colors'
                  }
                >
                  <td className="px-5 py-4 whitespace-nowrap text-sm font-semibold text-gray-200">
                    {index < 3 ? RANK_MEDALS[index] : index + 1}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-300">
                    {score.user_id === currentUserId ? '⭐ You' : `Player ${score.user_id?.slice(0, 6) ?? '—'}`}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm font-semibold text-blue-400">
                    {score.score}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-400">
                    {score.scenariosCompleted ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
