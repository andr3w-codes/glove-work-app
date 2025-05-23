import React, { useState, useEffect } from 'react';
import BaseRunnerDiagram from './BaseRunnerDiagram';

// Helper function to shuffle an array
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function Flashcard({ scenario, onNextScenario, onAnswer, currentScore, totalScenarios, currentIndex, selectedPosition }) {
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    setShowExplanation(false);
    setSelectedOption(null);
    setIsTransitioning(true);
    // Shuffle options when scenario changes
    setShuffledOptions(shuffleArray(scenario.options));
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [scenario]);

  if (!scenario) {
    return <p className="text-center text-gray-500">No scenario loaded.</p>;
  }

  const handleOptionClick = (option, index) => {
    setSelectedOption({ ...option, index });
    setShowExplanation(true);
    if (onAnswer) {
      onAnswer(option.isCorrect);
    }
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowExplanation(false);
      setSelectedOption(null);
      onNextScenario();
    }, 300);
  };

  const { situation, question, explanation, baseRunners, outs, ballLocation } = scenario;
  const isLastQuestion = currentIndex + 1 >= totalScenarios;
  const progress = ((currentIndex + 1) / totalScenarios) * 100;

  return (
    <div className={`max-w-2xl mx-auto transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {/* Progress and Score */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium text-gray-600">
            Scenario {currentIndex + 1} of {totalScenarios}
          </div>
          <div className="text-sm font-semibold text-blue-600">
            Score: {currentScore}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-lg p-6 w-full mx-auto border border-gray-200 transform transition-all duration-300 hover:shadow-2xl">
        <BaseRunnerDiagram 
          baseRunners={baseRunners} 
          outs={outs} 
          ballLocation={ballLocation}
          selectedPosition={selectedPosition}
        />
        
        <div className="mb-6">
          <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-1">Situation:</p>
          <p className="text-lg text-gray-800 leading-relaxed">{situation}</p>
        </div>
        <div className="mb-8">
          <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-1">Question:</p>
          <p className="text-2xl font-bold text-blue-700 leading-tight">{question}</p>
        </div>

        <div className="space-y-4 mb-8">
          {shuffledOptions.map((option, index) => {
            let buttonClass = "w-full text-left p-4 border border-gray-700 rounded-lg bg-[#23232a] hover:bg-[#2d2d38] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 transform hover:scale-[1.02] flex items-center";
            if (showExplanation && selectedOption && selectedOption.index === index) {
              buttonClass += option.isCorrect 
                ? ' bg-green-900 border-green-400 text-green-300 ring-2 ring-green-400' 
                : ' bg-red-900 border-red-400 text-red-300 ring-2 ring-red-400';
            } else if (showExplanation && option.isCorrect) {
              buttonClass += ' bg-green-900 border-green-300 text-green-300';
            }
            return (
              <button
                key={index}
                onClick={() => handleOptionClick(option, index)}
                disabled={showExplanation}
                className={buttonClass}
              >
                <span className="flex items-center min-w-[2.25rem] h-9 justify-center bg-[#18181b] text-gray-100 rounded-full mr-3 text-base font-bold border border-gray-700">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="break-words text-left">{option.text}</span>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className={`p-6 rounded-lg mt-6 transform transition-all duration-300 ${
            selectedOption?.isCorrect 
              ? 'bg-green-900 border border-green-400 text-green-300' 
              : 'bg-red-900 border border-red-400 text-red-300'
          }`}>
            <h3 className={`text-xl font-bold mb-2 ${
              selectedOption?.isCorrect ? 'text-green-300' : 'text-red-300'
            }`}>
              {selectedOption?.isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </h3>
            <p className="mb-6 leading-relaxed">{explanation}</p>
            <button 
              onClick={handleNext}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 transform hover:scale-[1.02]"
            >
              {isLastQuestion ? 'Finish' : 'Next Scenario'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Flashcard; 