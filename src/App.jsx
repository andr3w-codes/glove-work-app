import React, { useState, useEffect, useCallback, useRef } from 'react';
import PositionSelector from './components/PositionSelector';
import Flashcard from './components/Flashcard';
import CustomScenarioForm from './components/CustomScenarioForm';
import Leaderboard from './components/Leaderboard';
import RulesAgent from './components/RulesAgent';
import Navigation from './components/Navigation';
import AuthModal from './components/AuthModal';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { positions } from './data/positions';
import './App.css';
import { db } from './db/clientConfig';
import gloveWorkLogo from './assets/glove_work.png';

const SESSION_LENGTH = 5;

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function AppInner() {
  const { user, isAnonymous } = useAuth();

  const [allScenarios, setAllScenarios] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [activeView, setActiveView] = useState('practice');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Completed scenario IDs — loaded from localStorage per user
  const [completedScenarioIds, setCompletedScenarioIds] = useState([]);

  // Session state
  const [isSessionModeActive, setIsSessionModeActive] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [currentSessionQuestionNum, setCurrentSessionQuestionNum] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);
  const [showSessionResults, setShowSessionResults] = useState(false);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(0);

  // Load scenarios on mount
  useEffect(() => {
    loadScenarios();
  }, []);

  // Load/save completed scenario IDs per user
  useEffect(() => {
    if (!user) return;
    const stored = localStorage.getItem(`progress_${user.id}`);
    setCompletedScenarioIds(stored ? JSON.parse(stored) : []);
  }, [user?.id]);

  const saveCompletedIds = (ids) => {
    if (!user) return;
    localStorage.setItem(`progress_${user.id}`, JSON.stringify(ids));
    setCompletedScenarioIds(ids);
  };

  const loadScenarios = async () => {
    try {
      setIsLoading(true);
      const dbScenarios = await db.getCustomScenarios();
      setAllScenarios(dbScenarios);
      setScenarios(dbScenarios);
      setError(null);
    } catch (err) {
      console.error('Error loading scenarios:', err);
      setError('Failed to load scenarios. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPosition) {
      const relevant = allScenarios.filter(s => s.positionFocus.includes(selectedPosition));
      setScenarios(shuffleArray(relevant));
    } else {
      setScenarios(allScenarios);
    }
    setCurrentScenarioIndex(0);
    setIsSessionModeActive(false);
    setShowSessionResults(false);
    setSessionQuestions([]);
    setCurrentSessionQuestionNum(0);
    setSessionScore(0);
  }, [selectedPosition, allScenarios]);

  const getUnusedScenarios = useCallback(() => {
    return scenarios.filter(s => !sessionQuestions.some(q => q.id === s.id));
  }, [scenarios, sessionQuestions]);

  const startSession = () => {
    const unused = getUnusedScenarios();
    let pool;
    if (unused.length === 0) {
      pool = shuffleArray(scenarios).slice(0, Math.min(SESSION_LENGTH, scenarios.length));
      setSessionQuestions([]);
    } else if (unused.length < SESSION_LENGTH) {
      pool = shuffleArray(unused);
    } else {
      pool = shuffleArray(unused).slice(0, SESSION_LENGTH);
    }
    setSessionQuestions(pool);
    setCurrentSessionQuestionNum(1);
    setSessionScore(0);
    streakRef.current = 0;
    bestStreakRef.current = 0;
    setIsSessionModeActive(true);
    setShowSessionResults(false);
  };

  const handleAnswerInSession = (isCorrect) => {
    if (isCorrect) {
      setSessionScore(prev => prev + 1);
      streakRef.current += 1;
      if (streakRef.current > bestStreakRef.current) {
        bestStreakRef.current = streakRef.current;
      }
    } else {
      streakRef.current = 0;
    }
  };

  const handleNextQuestionInSession = async () => {
    if (currentSessionQuestionNum >= sessionQuestions.length) {
      // Session complete — persist results
      setIsSessionModeActive(false);
      setShowSessionResults(true);

      // Mark all session scenarios as completed
      const newIds = [
        ...new Set([
          ...completedScenarioIds,
          ...sessionQuestions.map(q => q.id),
        ]),
      ];
      saveCompletedIds(newIds);

      // Persist score to DB
      if (user) {
        try {
          const prev = await db.getUserScore(user.id);
          const newScore = (prev?.score ?? 0) + sessionScore;
          await db.updateUserScore(user.id, {
            score: newScore,
            scenariosCompleted: (prev?.scenarios_completed ?? 0) + sessionQuestions.length,
            correctAnswers: (prev?.correct_answers ?? 0) + sessionScore,
            bestStreak: Math.max(prev?.best_streak ?? 0, bestStreakRef.current),
            lastPlayed: new Date(),
          });
          await db.updateLeaderboardEntry(user.id, newScore);
        } catch (err) {
          console.error('Score save failed:', err.message);
        }
      }
      return;
    }
    setCurrentSessionQuestionNum(prev => prev + 1);
  };

  const resetPractice = () => {
    setSelectedPosition(null);
    setCurrentScenarioIndex(0);
    setIsSessionModeActive(false);
    setShowSessionResults(false);
    setSessionQuestions([]);
    setCurrentSessionQuestionNum(0);
    setSessionScore(0);
  };

  const currentScenarioToDisplay = isSessionModeActive && sessionQuestions.length > 0
    ? sessionQuestions[currentSessionQuestionNum - 1]
    : scenarios[currentScenarioIndex];

  const renderContent = () => {
    switch (activeView) {
      case 'create':
        return <CustomScenarioForm />;
      case 'leaderboard':
        return <Leaderboard currentUserId={user?.id} />;
      case 'rules':
        return <RulesAgent />;
      case 'practice':
      default:
        if (isLoading) {
          return (
            <div className="flex flex-col items-center justify-center h-40 gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
              <p className="text-gray-500 text-sm">Loading scenarios…</p>
            </div>
          );
        }
        if (error) {
          return (
            <div className="mt-4 p-4 bg-red-900/40 border border-red-700 rounded-lg text-center">
              <p className="text-red-300">{error}</p>
              <button onClick={loadScenarios} className="mt-3 btn-primary text-sm">Retry</button>
            </div>
          );
        }
        return (
          <>
            {!isSessionModeActive && !showSessionResults && (
              <div className="animate-slide-in">
                <PositionSelector onSelect={setSelectedPosition} selectedPosition={selectedPosition} />
              </div>
            )}

            {!isSessionModeActive && selectedPosition && scenarios.length > 0 && !showSessionResults && (
              <div className="my-3 text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Playing as <span className="text-blue-400 font-semibold">{positions.find(p => p.id === selectedPosition)?.name || selectedPosition}</span>
                </p>
                <button onClick={startSession} className="btn-primary text-base sm:text-lg">
                  Start {Math.min(SESSION_LENGTH, getUnusedScenarios().length || SESSION_LENGTH)}-Question Session
                </button>
              </div>
            )}

            {isSessionModeActive && currentScenarioToDisplay && (
              <div className="animate-fade-in flex-grow">
                <Flashcard
                  scenario={currentScenarioToDisplay}
                  onNextScenario={handleNextQuestionInSession}
                  onAnswer={handleAnswerInSession}
                  currentScore={sessionScore}
                  totalScenarios={sessionQuestions.length}
                  currentIndex={currentSessionQuestionNum - 1}
                  selectedPosition={selectedPosition}
                  positionName={positions.find(p => p.id === selectedPosition)?.name || selectedPosition}
                  completedScenarioIds={completedScenarioIds}
                />
              </div>
            )}

            {showSessionResults && (
              <div className="mt-4 p-6 bg-[#23232a] border border-[#333642] rounded-lg text-center animate-fade-in">
                <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-2">Session Complete!</h2>
                <p className="text-sm sm:text-base text-gray-400 mb-1">
                  {positions.find(p => p.id === selectedPosition)?.name || selectedPosition}
                </p>
                <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
                  {sessionScore} <span className="text-gray-500 text-xl font-normal">/ {sessionQuestions.length}</span>
                </p>
                <p className="text-sm text-gray-500 mb-5">
                  {sessionScore === sessionQuestions.length ? '🎉 Perfect score!' : sessionScore >= sessionQuestions.length / 2 ? '👍 Nice work!' : '💪 Keep practicing!'}
                </p>

                {isAnonymous && (
                  <div className="mb-5 p-3 bg-blue-900/30 border border-blue-700/50 rounded-lg">
                    <p className="text-blue-300 text-sm mb-2">Create an account to save your progress across devices.</p>
                    <button onClick={() => setShowAuthModal(true)} className="btn-primary text-sm w-full">
                      Save Progress
                    </button>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button onClick={startSession} className="btn-primary text-sm sm:text-base">Play Again</button>
                  <button onClick={resetPractice} className="btn-secondary text-sm sm:text-base">Change Position</button>
                </div>
              </div>
            )}

            {selectedPosition && scenarios.length === 0 && !isSessionModeActive && !showSessionResults && (
              <div className="mt-2 p-4 bg-[#23232a] border border-[#333642] rounded-lg text-center animate-fade-in">
                <p className="text-sm sm:text-base text-gray-400">
                  No scenarios available for {positions.find(p => p.id === selectedPosition)?.name || selectedPosition} yet.
                </p>
              </div>
            )}

            {!selectedPosition && !isSessionModeActive && !showSessionResults && (
              <div className="mt-4 p-4 bg-[#23232a] border border-[#333642] rounded-lg text-center animate-fade-in">
                <p className="text-sm text-gray-500">Select a position above to get started.</p>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-baseball flex flex-col">
      <header className="sticky top-0 z-20 shadow-sm border-b border-[#333642]">
        <div className="max-w-2xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
          <img
            src={gloveWorkLogo}
            alt="Glove Work"
            className="h-10 w-auto"
            style={{ filter: 'invert(1) brightness(2)' }}
          />
          <p className="hidden sm:block text-xs text-gray-500 flex-1 text-center">
            Master the fundamentals, one play at a time
          </p>
          <Navigation
            activeView={activeView}
            setActiveView={setActiveView}
            onOpenAuth={() => setShowAuthModal(true)}
          />
        </div>
      </header>

      <main className="flex-grow max-w-2xl w-full mx-auto px-4 py-4">
        {renderContent()}
      </main>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
