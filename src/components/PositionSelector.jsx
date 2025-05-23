import React from 'react';
import { positions } from '../data/positions';

function PositionSelector({ selectedPosition, onSelect }) {
  return (
    <div className="my-4">
      <label className="block text-lg font-medium text-gray-200 mb-3 text-center">
        Choose a Position:
      </label>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {positions.map((position) => {
          const isSelected = selectedPosition === position.id;
          return (
            <button
              key={position.id}
              onClick={() => onSelect(position.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all duration-200 font-semibold text-base shadow-md
                ${isSelected ? 'bg-blue-700 border-blue-400 text-white scale-105' : 'bg-[#23232a] border-gray-700 text-gray-100 hover:bg-blue-800 hover:text-white hover:border-blue-500'}
              `}
              style={{ minHeight: '72px' }}
            >
              <span className="text-lg font-bold">{position.id}</span>
              <span className="text-xs mt-1 opacity-80">{position.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PositionSelector; 