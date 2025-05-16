import { useState } from 'react';
import { db } from '../db/clientConfig';
import BaseRunnerDiagram from './BaseRunnerDiagram';

const CustomScenarioForm = () => {
  const [scenario, setScenario] = useState({
    positionFocus: [],
    baseRunners: { first: false, second: false, third: false },
    outs: 0,
    ballLocation: { x: 0, y: 0 },
    situation: '',
    question: '',
    options: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ],
    explanation: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handlePositionChange = (position) => {
    setScenario(prev => ({
      ...prev,
      positionFocus: prev.positionFocus.includes(position)
        ? prev.positionFocus.filter(p => p !== position)
        : [...prev.positionFocus, position]
    }));
  };

  const handleBaseRunnerChange = (base) => {
    setScenario(prev => ({
      ...prev,
      baseRunners: {
        ...prev.baseRunners,
        [base]: !prev.baseRunners[base]
      }
    }));
  };

  const handleOptionChange = (index, field, value) => {
    setScenario(prev => ({
      ...prev,
      options: prev.options.map((option, i) => 
        i === index ? { ...option, [field]: value } : option
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate form
      if (!scenario.positionFocus.length) {
        throw new Error('Please select at least one position');
      }
      if (!scenario.situation || !scenario.question) {
        throw new Error('Please fill in all required fields');
      }
      if (!scenario.options.every(opt => opt.text)) {
        throw new Error('Please fill in all options');
      }
      if (!scenario.options.some(opt => opt.isCorrect)) {
        throw new Error('Please mark one option as correct');
      }

      // Submit to database
      await db.createCustomScenario({
        ...scenario,
        createdAt: new Date(),
        updatedAt: new Date(),
        isApproved: false
      });

      setSuccess(true);
      // Reset form
      setScenario({
        positionFocus: [],
        baseRunners: { first: false, second: false, third: false },
        outs: 0,
        ballLocation: { x: 0, y: 0 },
        situation: '',
        question: '',
        options: [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false }
        ],
        explanation: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Custom Scenario</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Scenario created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Position Selection */}
        <div>
          <label className="block font-medium mb-2">Positions</label>
          <div className="flex flex-wrap gap-2">
            {['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF'].map(position => (
              <button
                key={position}
                type="button"
                onClick={() => handlePositionChange(position)}
                className={`px-3 py-1 rounded ${
                  scenario.positionFocus.includes(position)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {position}
              </button>
            ))}
          </div>
        </div>

        {/* Base Runners */}
        <div>
          <label className="block font-medium mb-2">Base Runners</label>
          <div className="flex gap-4">
            {['first', 'second', 'third'].map(base => (
              <label key={base} className="flex items-center">
                <input
                  type="checkbox"
                  checked={scenario.baseRunners[base]}
                  onChange={() => handleBaseRunnerChange(base)}
                  className="mr-2"
                />
                {base.charAt(0).toUpperCase() + base.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Outs */}
        <div>
          <label className="block font-medium mb-2">Outs</label>
          <select
            value={scenario.outs}
            onChange={(e) => setScenario(prev => ({ ...prev, outs: parseInt(e.target.value) }))}
            className="w-full p-2 border rounded"
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </div>

        {/* Ball Location */}
        <div>
          <label className="block font-medium mb-2">Ball Location</label>
          <BaseRunnerDiagram
            baseRunners={scenario.baseRunners}
            outs={scenario.outs}
            ballLocation={scenario.ballLocation}
            onBallLocationSelect={(location) => setScenario(prev => ({ ...prev, ballLocation: location }))}
            isInteractive={true}
          />
        </div>

        {/* Situation */}
        <div>
          <label className="block font-medium mb-2">Situation</label>
          <textarea
            value={scenario.situation}
            onChange={(e) => setScenario(prev => ({ ...prev, situation: e.target.value }))}
            className="w-full p-2 border rounded"
            rows={3}
            required
          />
        </div>

        {/* Question */}
        <div>
          <label className="block font-medium mb-2">Question</label>
          <textarea
            value={scenario.question}
            onChange={(e) => setScenario(prev => ({ ...prev, question: e.target.value }))}
            className="w-full p-2 border rounded"
            rows={2}
            required
          />
        </div>

        {/* Options */}
        <div>
          <label className="block font-medium mb-2">Options</label>
          {scenario.options.map((option, index) => (
            <div key={index} className="mb-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                  className="flex-1 p-2 border rounded"
                  placeholder={`Option ${index + 1}`}
                  required
                />
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="correctOption"
                    checked={option.isCorrect}
                    onChange={() => handleOptionChange(index, 'isCorrect', true)}
                    className="mr-2"
                  />
                  Correct
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* Explanation */}
        <div>
          <label className="block font-medium mb-2">Explanation</label>
          <textarea
            value={scenario.explanation}
            onChange={(e) => setScenario(prev => ({ ...prev, explanation: e.target.value }))}
            className="w-full p-2 border rounded"
            rows={3}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Creating...' : 'Create Scenario'}
        </button>
      </form>
    </div>
  );
};

export default CustomScenarioForm; 