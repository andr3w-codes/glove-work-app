import React, { useState, useEffect, useCallback } from 'react';
import PositionSelector from './components/PositionSelector';
import Flashcard from './components/Flashcard';
import { scenarios as allScenarios } from './data/scenarios';
import { positions } from './data/positions';

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

  const startSession = () => {
    if (filteredScenarios.length === 0) {
      alert("No scenarios available for this position to start a session.");
      return;
    }
    const shuffled = shuffleArray(filteredScenarios);
    setSessionQuestions(shuffled.slice(0, SESSION_LENGTH));
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
    if (currentSessionQuestionNum <  sessionQuestions.length) {
      setCurrentSessionQuestionNum(prevNum => prevNum + 1);
    } else {
      setIsSessionModeActive(false);
      setShowSessionResults(true);
    }
  };
  
  const handleNextScenarioGeneral = () => {
    setCurrentScenarioIndex(prevIndex => (prevIndex + 1) % filteredScenarios.length);
  };

  let currentScenarioToDisplay;
  if (isSessionModeActive && sessionQuestions.length > 0) {
    currentScenarioToDisplay = sessionQuestions[currentSessionQuestionNum -1];
  } else if (!isSessionModeActive && filteredScenarios.length > 0) {
    currentScenarioToDisplay = filteredScenarios[currentScenarioIndex];
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10 pb-20">
      <header className="text-center p-6">
        <h1 className="text-4xl font-bold text-blue-700">
          🧢 Youth Baseball Flashcards ⚾
        </h1>
        <p className="text-xl text-gray-700 mt-2">
          Learn the game, one play at a time!
        </p>
      </header>
      <main className="p-4 w-full max-w-2xl">
        {!isSessionModeActive && !showSessionResults && (
          <PositionSelector 
            selectedPosition={selectedPosition} 
            onPositionChange={handlePositionChange} 
          />
        )}

        {selectedPosition && currentPositionName && !showSessionResults && (
          <div className="mt-6 mb-4 p-3 bg-white shadow rounded-lg text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Playing as: <span className="text-blue-600">{currentPositionName} ({selectedPosition})</span>
            </h2>
          </div>
        )}

        {!isSessionModeActive && selectedPosition && filteredScenarios.length > 0 && !showSessionResults && (
          <div className="my-6 text-center">
            <button 
              onClick={startSession}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out"
            >
              Start 5-Question Session
            </button>
          </div>
        )}

        {isSessionModeActive && currentSessionQuestionNum > 0 && sessionQuestions.length > 0 && (
            <div className="text-center mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
                <p className="text-lg font-semibold text-yellow-800">
                    Question {currentSessionQuestionNum} of {sessionQuestions.length}
                </p>
                 <p className="text-md text-yellow-700">Score: {sessionScore}</p>
            </div>
        )}

        {isSessionModeActive && currentScenarioToDisplay && (
          <Flashcard 
            scenario={currentScenarioToDisplay} 
            onNextScenario={handleNextQuestionInSession}
            onAnswer={handleAnswerInSession}
          />
        )}

        {showSessionResults && (
          <div className="mt-10 p-6 bg-white shadow-xl rounded-lg text-center">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">Session Over!</h2>
            <p className="text-2xl text-gray-800 mb-2">
              You played as {currentPositionName} ({selectedPosition}).
            </p>
            <p className="text-4xl font-semibold text-green-600 mb-6">
              Your Score: {sessionScore} / {sessionQuestions.length}
            </p>
            <div className="space-x-4">
              <button
                onClick={startSession}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out"
              >
                Play Again ({currentPositionName})
              </button>
              <button
                onClick={() => {
                  setSelectedPosition('');
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out"
              >
                Choose New Position
              </button>
            </div>
          </div>
        )}

        {selectedPosition && filteredScenarios.length === 0 && !isSessionModeActive && !showSessionResults && (
          <div className="mt-6 p-4 bg-white shadow-md rounded-lg text-center">
            <p className="text-gray-700">
              No scenarios currently available for {currentPositionName} ({selectedPosition}). Check back later!
            </p>
          </div>
        )}
        {!selectedPosition && !isSessionModeActive && !showSessionResults && (
           <div className="mt-6 p-4 bg-white shadow-md rounded-lg text-center">
            <p className="text-gray-600">
              Please select a position to start.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App; 