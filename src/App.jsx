import React, { useState, useEffect, useCallback } from 'react';
import PositionSelector from './components/PositionSelector';
import Flashcard from './components/Flashcard';
import CustomScenarioForm from './components/CustomScenarioForm';
import Leaderboard from './components/Leaderboard';
import RulesAgent from './components/RulesAgent';
import Navigation from './components/Navigation';
import { positions } from './data/positions';
import './App.css';
import { db } from './db/clientConfig';
import gloveWorkLogo from './assets/glove_work.png';

const SESSION_LENGTH = 5;

// Helper function to shuffle an array
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function App() {
  const [allScenarios, setAllScenarios] = useState([]); // Store all scenarios
  const [scenarios, setScenarios] = useState([]);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [activeView, setActiveView] = useState('practice');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Session Mode State
  const [isSessionModeActive, setIsSessionModeActive] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [currentSessionQuestionNum, setCurrentSessionQuestionNum] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);
  const [showSessionResults, setShowSessionResults] = useState(false);

  useEffect(() => {
    loadScenarios();
  }, []);

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

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextScenario = () => {
    setCurrentScenarioIndex(prev => (prev + 1) % scenarios.length);
  };

  const handlePositionSelect = (position) => {
    setSelectedPosition(position);
  };

  // Only filter scenarios and reset session state when a new position is selected
  useEffect(() => {
    if (selectedPosition) {
      const relevantScenarios = allScenarios.filter(scenario =>
        scenario.positionFocus.includes(selectedPosition)
      );
      setScenarios(shuffleArray(relevantScenarios));
      setCurrentScenarioIndex(0);
      setIsSessionModeActive(false);
      setShowSessionResults(false);
      setSessionQuestions([]);
      setCurrentSessionQuestionNum(0);
      setSessionScore(0);
    } else {
      setScenarios(allScenarios);
      setCurrentScenarioIndex(0);
      setIsSessionModeActive(false);
      setShowSessionResults(false);
      setSessionQuestions([]);
      setCurrentSessionQuestionNum(0);
      setSessionScore(0);
    }
  }, [selectedPosition, allScenarios]);

  const getUnusedScenarios = useCallback(() => {
    return scenarios.filter(scenario => !sessionQuestions.some(q => q.id === scenario.id));
  }, [scenarios, sessionQuestions]);

  // Only start a session when the user clicks the button
  const startSession = () => {
    const unusedScenarios = getUnusedScenarios();
    if (unusedScenarios.length === 0) {
      alert("You've completed all available scenarios for this position! Starting over with all scenarios.");
      setSessionQuestions([]);
      const shuffled = shuffleArray(scenarios);
      setSessionQuestions(shuffled.slice(0, Math.min(SESSION_LENGTH, shuffled.length)));
    } else if (unusedScenarios.length < SESSION_LENGTH) {
      alert(`Only ${unusedScenarios.length} new scenarios remaining. Starting a shorter session.`);
      const shuffled = shuffleArray(unusedScenarios);
      setSessionQuestions(shuffled);
    } else {
      const shuffled = shuffleArray(unusedScenarios);
      setSessionQuestions(shuffled.slice(0, SESSION_LENGTH));
    }
    setCurrentSessionQuestionNum(1);
    setSessionScore(0);
    setIsSessionModeActive(true);
    setShowSessionResults(false);
  };

  const handleAnswerInSession = (isCorrect) => {
    if (isCorrect) {
      setSessionScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestionInSession = () => {
    if (currentSessionQuestionNum >= sessionQuestions.length) {
      setIsSessionModeActive(false);
      setShowSessionResults(true);
      return;
    }
    setCurrentSessionQuestionNum(prevNum => prevNum + 1);
  };
  
  const handleNextScenarioInSession = () => {
    setCurrentScenarioIndex((prev) => (prev + 1) % scenarios.length);
  };

  let currentScenarioToDisplay;
  if (isSessionModeActive && sessionQuestions.length > 0) {
    currentScenarioToDisplay = sessionQuestions[currentSessionQuestionNum - 1];
  } else {
    currentScenarioToDisplay = scenarios[currentScenarioIndex];
  }

  const renderContent = () => {
    switch (activeView) {
      case 'create':
        return <CustomScenarioForm />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'rules':
        return <RulesAgent />;
      case 'practice':
      default:
        if (isLoading) {
          return <div className="text-center">Loading scenarios...</div>;
        }
        if (error) {
          return <div className="text-center text-red-500">{error}</div>;
        }
        if (scenarios.length === 0) {
          return <div className="text-center">No scenarios available.</div>;
        }
        return (
          <>
            {!isSessionModeActive && !showSessionResults && (
              <div className="animate-slide-in">
                <PositionSelector 
                  onSelect={handlePositionSelect}
                  selectedPosition={selectedPosition}
                />
              </div>
            )}

            {selectedPosition && scenarios.length > 0 && !showSessionResults && (
              <div className="mt-2 mb-2 p-2 bg-white shadow rounded-lg text-center hover-lift">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                  Playing as: <span className="text-blue-600">{positions.find(p => p.id === selectedPosition)?.name || selectedPosition}</span>
                </h2>
              </div>
            )}

            {!isSessionModeActive && selectedPosition && scenarios.length > 0 && !showSessionResults && (
              <div className="my-2 text-center">
                <button 
                  onClick={startSession}
                  className="btn-primary text-base sm:text-lg"
                >
                  Start {Math.min(SESSION_LENGTH, getUnusedScenarios().length)}-Question Session
                </button>
              </div>
            )}

            {isSessionModeActive && currentSessionQuestionNum > 0 && sessionQuestions.length > 0 && (
              <div className="text-center mb-2 p-2 bg-yellow-100 border border-yellow-300 rounded-lg animate-fade-in">
                <p className="text-sm sm:text-base font-semibold text-yellow-800">
                  Question {currentSessionQuestionNum} of {sessionQuestions.length}
                </p>
                <p className="text-xs sm:text-sm text-yellow-700">Score: {sessionScore}</p>
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
                />
              </div>
            )}

            {showSessionResults && (
              <div className="mt-4 p-4 bg-white shadow-xl rounded-lg text-center animate-fade-in">
                <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-2">Session Over!</h2>
                <p className="text-base sm:text-lg text-gray-800 mb-1">
                  You played as {positions.find(p => p.id === selectedPosition)?.name || selectedPosition}.
                </p>
                <p className="text-2xl sm:text-3xl font-semibold text-green-600 mb-4">
                  Your Score: {sessionScore} / {sessionQuestions.length}
                </p>
                <div className="space-x-2 sm:space-x-4">
                  <button
                    onClick={startSession}
                    className="btn-primary text-sm sm:text-base"
                  >
                    Play Again ({positions.find(p => p.id === selectedPosition)?.name || selectedPosition})
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPosition(null);
                      setScenarios([]);
                      setCurrentScenarioIndex(0);
                      setScore(0);
                      setIsSessionModeActive(false);
                      setShowSessionResults(false);
                      setSessionQuestions([]);
                      setCurrentSessionQuestionNum(0);
                      setSessionScore(0);
                    }}
                    className="btn-secondary text-sm sm:text-base"
                  >
                    Choose New Position
                  </button>
                </div>
              </div>
            )}

            {selectedPosition && scenarios.length === 0 && !isSessionModeActive && !showSessionResults && (
              <div className="mt-2 p-3 bg-white shadow-md rounded-lg text-center animate-fade-in">
                <p className="text-sm sm:text-base text-gray-700">
                  No scenarios currently available for {positions.find(p => p.id === selectedPosition)?.name || selectedPosition}. Check back later!
                </p>
              </div>
            )}
            {!selectedPosition && !isSessionModeActive && !showSessionResults && (
              <div className="mt-2 p-3 bg-white shadow-md rounded-lg text-center animate-fade-in">
                <p className="text-sm sm:text-base text-gray-600">
                  Please select a position to start.
                </p>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-baseball flex flex-col">
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex flex-col items-center justify-between">
            <img src={gloveWorkLogo} alt="Glove Work Logo" className="mx-auto w-full max-w-xs sm:max-w-md md:max-w-lg h-auto block" style={{ filter: 'invert(1) brightness(2)' }} />
            <Navigation activeView={activeView} setActiveView={setActiveView} />
          </div>
          <p className="text-sm text-gray-600 mt-1 text-center">
            Master the fundamentals, one play at a time
          </p>
        </div>
      </header>

      <main className="flex-grow max-w-2xl w-full mx-auto px-4 py-4">
        {renderContent()}
      </main>
    </div>
  );
}

export default App; 
