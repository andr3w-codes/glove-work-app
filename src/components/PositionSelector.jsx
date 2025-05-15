import React from 'react';
import { positions } from '../data/positions';

function PositionSelector({ selectedPosition, onPositionChange }) {
  return (
    <div className="my-4">
      <label htmlFor="position-select" className="block text-lg font-medium text-gray-700 mb-1">
        Choose a Position:
      </label>
      <select
        id="position-select"
        value={selectedPosition}
        onChange={(e) => onPositionChange(e.target.value)}
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
      >
        <option value="" disabled>Select a position</option>
        {positions.map((position) => (
          <option key={position.id} value={position.id}>
            {position.name} ({position.id})
          </option>
        ))}
      </select>
    </div>
  );
}

export default PositionSelector; 