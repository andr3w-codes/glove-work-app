import React, { useState, useEffect } from 'react';
import BaseRunnerDiagram from './BaseRunnerDiagram';

function Flashcard({ scenario, onNextScenario, onAnswer, currentScore, totalScenarios, currentIndex, selectedPosition }) {
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setShowExplanation(false);
    setSelectedOption(null);
    setIsTransitioning(true);
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

  const { situation, question, options, explanation, baseRunners, outs, ballLocation } = scenario;
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
          {options.map((option, index) => {
            let buttonClass = "w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 transform hover:scale-[1.02]";
            if (showExplanation && selectedOption && selectedOption.index === index) {
              buttonClass += option.isCorrect 
                ? ' bg-green-50 border-green-400 text-green-700 ring-2 ring-green-400' 
                : ' bg-red-50 border-red-400 text-red-700 ring-2 ring-red-400';
            } else if (showExplanation && option.isCorrect) {
              buttonClass += ' bg-green-50 border-green-300';
            }
            return (
              <button
                key={index}
                onClick={() => handleOptionClick(option, index)}
                disabled={showExplanation}
                className={buttonClass}
              >
                <span className="flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full mr-3 text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className={`p-6 rounded-lg mt-6 transform transition-all duration-300 ${
            selectedOption?.isCorrect 
              ? 'bg-green-50 border border-green-300' 
              : 'bg-red-50 border border-red-300'
          }`}>
            <h3 className={`text-xl font-bold mb-2 ${
              selectedOption?.isCorrect ? 'text-green-700' : 'text-red-700'
            }`}>
              {selectedOption?.isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">{explanation}</p>
            <button 
              onClick={handleNext}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 transform hover:scale-[1.02]"
            >
              {currentIndex + 1 === totalScenarios ? 'Finish' : 'Next Scenario'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Flashcard; 