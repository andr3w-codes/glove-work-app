import React, { useState, useEffect, useCallback } from 'react';
import PositionSelector from './components/PositionSelector';
import Flashcard from './components/Flashcard';
import { scenarios as allScenarios } from './data/scenarios';
import { positions } from './data/positions';
import './App.css';

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
  const [selectedPosition, setSelectedPosition] = useState('');
  const [filteredScenarios, setFilteredScenarios] = useState([]);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [currentPositionName, setCurrentPositionName] = useState('');
  const [score, setScore] = useState(0);
  const [usedScenarioIds, setUsedScenarioIds] = useState(new Set());

  // Session Mode State
  const [isSessionModeActive, setIsSessionModeActive] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [currentSessionQuestionNum, setCurrentSessionQuestionNum] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);
  const [showSessionResults, setShowSessionResults] = useState(false);

  const resetToDefaultView = useCallback(() => {
    setIsSessionModeActive(false);
    setShowSessionResults(false);
    setSessionQuestions([]);
    setCurrentSessionQuestionNum(0);
    setSessionScore(0);
    setUsedScenarioIds(new Set());
    if (selectedPosition) {
      const relevantScenarios = allScenarios.filter(scenario => 
        scenario.positionFocus.includes(selectedPosition)
      );
      setFilteredScenarios(relevantScenarios);
      setCurrentScenarioIndex(0);
    }
  }, [selectedPosition]);

  useEffect(() => {
    if (selectedPosition) {
      const relevantScenarios = allScenarios.filter(scenario => 
        scenario.positionFocus.includes(selectedPosition)
      );
      setFilteredScenarios(relevantScenarios);
      setCurrentScenarioIndex(0);
      const posName = positions.find(p => p.id === selectedPosition)?.name || selectedPosition;
      setCurrentPositionName(posName);
      resetToDefaultView();
    } else {
      setFilteredScenarios([]);
      setCurrentPositionName('');
      resetToDefaultView();
    }
  }, [selectedPosition]);

  const handlePositionChange = (newPosition) => {
    setSelectedPosition(newPosition);
  };

  const getUnusedScenarios = useCallback(() => {
    return filteredScenarios.filter(scenario => !usedScenarioIds.has(scenario.id));
  }, [filteredScenarios, usedScenarioIds]);

  const startSession = () => {
    const unusedScenarios = getUnusedScenarios();
    if (unusedScenarios.length === 0) {
      alert("You've completed all available scenarios for this position! Starting over with all scenarios.");
      setUsedScenarioIds(new Set());
      const shuffled = shuffleArray(filteredScenarios);
      setSessionQuestions(shuffled.slice(0, SESSION_LENGTH));
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
    if (currentSessionQuestionNum < sessionQuestions.length) {
      // Mark the current scenario as used
      const currentScenario = sessionQuestions[currentSessionQuestionNum - 1];
      setUsedScenarioIds(prev => new Set([...prev, currentScenario.id]));
      setCurrentSessionQuestionNum(prevNum => prevNum + 1);
    } else {
      setIsSessionModeActive(false);
      setShowSessionResults(true);
    }
  };
  
  const handleNextScenario = () => {
    setCurrentScenarioIndex((prev) => (prev + 1) % filteredScenarios.length);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  let currentScenarioToDisplay;
  if (isSessionModeActive && sessionQuestions.length > 0) {
    currentScenarioToDisplay = sessionQuestions[currentSessionQuestionNum - 1];
  } else {
    currentScenarioToDisplay = filteredScenarios[currentScenarioIndex];
  }

  return (
    <div className="min-h-screen bg-baseball flex flex-col items-center pt-4 pb-4">
      <header className="text-center p-2 animate-fade-in">
        <div className="flex items-center justify-center space-x-2 mb-1">
          <span className="text-2xl sm:text-3xl">⚾</span>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Glove Work
          </h1>
          <span className="text-2xl sm:text-3xl">🧢</span>
        </div>
        <p className="text-sm sm:text-base text-gray-700 font-medium">
          Master the fundamentals, one play at a time
        </p>
      </header>
      <main className="p-2 w-full max-w-2xl flex-grow flex flex-col">
        {!isSessionModeActive && !showSessionResults && (
          <div className="animate-slide-in">
            <PositionSelector 
              selectedPosition={selectedPosition} 
              onPositionChange={handlePositionChange} 
            />
          </div>
        )}

        {selectedPosition && currentPositionName && !showSessionResults && (
          <div className="mt-2 mb-2 p-2 bg-white shadow rounded-lg text-center hover-lift">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">
              Playing as: <span className="text-blue-600">{currentPositionName} ({selectedPosition})</span>
            </h2>
          </div>
        )}

        {!isSessionModeActive && selectedPosition && filteredScenarios.length > 0 && !showSessionResults && (
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
              You played as {currentPositionName} ({selectedPosition}).
            </p>
            <p className="text-2xl sm:text-3xl font-semibold text-green-600 mb-4">
              Your Score: {sessionScore} / {sessionQuestions.length}
            </p>
            <div className="space-x-2 sm:space-x-4">
              <button
                onClick={startSession}
                className="btn-primary text-sm sm:text-base"
              >
                Play Again ({currentPositionName})
              </button>
              <button
                onClick={() => {
                  setSelectedPosition('');
                }}
                className="btn-secondary text-sm sm:text-base"
              >
                Choose New Position
              </button>
            </div>
          </div>
        )}

        {selectedPosition && filteredScenarios.length === 0 && !isSessionModeActive && !showSessionResults && (
          <div className="mt-2 p-3 bg-white shadow-md rounded-lg text-center animate-fade-in">
            <p className="text-sm sm:text-base text-gray-700">
              No scenarios currently available for {currentPositionName} ({selectedPosition}). Check back later!
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
      </main>
    </div>
  );
}

export default App; 