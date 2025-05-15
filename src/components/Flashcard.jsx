import React, { useState, useEffect } from 'react';
import BaseRunnerDiagram from './BaseRunnerDiagram';

function Flashcard({ scenario, onNextScenario, onAnswer }) {
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setShowExplanation(false);
    setSelectedOption(null);
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
    setShowExplanation(false);
    setSelectedOption(null);
    onNextScenario();
  };

  const { situation, question, options, explanation, baseRunners, outs, ballLocation } = scenario;

  return (
    <div className="bg-white shadow-xl rounded-lg p-6 w-full mx-auto border border-gray-200">
      <BaseRunnerDiagram baseRunners={baseRunners} outs={outs} ballLocation={ballLocation} />
      
      <div className="mb-4">
        <p className="text-sm text-gray-500 uppercase tracking-wide">Situation:</p>
        <p className="text-lg text-gray-800 leading-relaxed">{situation}</p>
      </div>
      <div className="mb-6">
        <p className="text-sm text-gray-500 uppercase tracking-wide">Question:</p>
        <p className="text-xl font-semibold text-blue-700 leading-tight">{question}</p>
      </div>

      <div className="space-y-3 mb-6">
        {options.map((option, index) => {
          let buttonClass = "w-full text-left p-3 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-150";
          if (showExplanation && selectedOption && selectedOption.index === index) {
            buttonClass += option.isCorrect ? ' bg-green-100 border-green-400 text-green-700' : ' bg-red-100 border-red-400 text-red-700';
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
              {option.text}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className={`p-4 rounded-md mt-4 ${selectedOption?.isCorrect ? 'bg-green-50 border border-green-300' : 'bg-red-50 border border-red-300'}`}>
          <h3 className={`text-lg font-semibold ${selectedOption?.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {selectedOption?.isCorrect ? 'Correct!' : 'Incorrect'}
          </h3>
          <p className="text-gray-700 mt-1">{explanation}</p>
          <button 
            onClick={handleNext}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-150"
          >
            Next Scenario
          </button>
        </div>
      )}
    </div>
  );
}

export default Flashcard; 