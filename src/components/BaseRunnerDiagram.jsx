import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Fielder position labels with their coordinates on the 400x400 SVG
const FIELDER_POSITIONS = {
  P:    { num: 1, x: 200, y: 196 },
  C:    { num: 2, x: 200, y: 340 },
  '1B': { num: 3, x: 322, y: 186 },
  '2B': { num: 4, x: 258, y: 148 },
  '3B': { num: 5, x: 78,  y: 186 },
  SS:   { num: 6, x: 142, y: 148 },
  LF:   { num: 7, x: 80,  y: 86  },
  CF:   { num: 8, x: 200, y: 56  },
  RF:   { num: 9, x: 320, y: 86  },
};

function BaseRunnerDiagram({ baseRunners, outs, ballLocation, onBallLocationSelect, isInteractive = false, selectedPosition }) {
  const [ballTarget, setBallTarget] = useState(null);
  const [ballKey, setBallKey] = useState(0);
  const svgRef = useRef(null);

  useEffect(() => {
    if (ballLocation) {
      setBallTarget(ballLocation);
      setBallKey(k => k + 1);
    } else if (isInteractive) {
      setBallTarget({ x: 200, y: 305 });
    }
  }, [ballLocation, isInteractive]);

  const handleClick = (event) => {
    if (!isInteractive) return;
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 400;
    const y = ((event.clientY - rect.top) / rect.height) * 400;
    setBallTarget({ x, y });
    if (onBallLocationSelect) onBallLocationSelect({ x, y });
  };

  return (
    <div className="relative w-72 h-72 mx-auto mb-6">
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full ${isInteractive ? 'cursor-crosshair' : ''}`}
        onClick={handleClick}
      >
        <defs>
          <radialGradient id="outfieldGrad" cx="50%" cy="75%" r="65%">
            <stop offset="0%" stopColor="#4a8c3f" />
            <stop offset="100%" stopColor="#265c18" />
          </radialGradient>
          <radialGradient id="dirtGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#c9975c" />
            <stop offset="100%" stopColor="#9e6e38" />
          </radialGradient>
          <radialGradient id="infieldGrassGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5aaa46" />
            <stop offset="100%" stopColor="#3f8430" />
          </radialGradient>
          <filter id="ballShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="1" dy="1.5" stdDeviation="1.5" floodOpacity="0.5" />
          </filter>
          <filter id="runnerGlow">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#3B82F6" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Outfield grass */}
        <path
          d="M200,50 A175,175 0 0,1 375,225 L200,400 L25,225 A175,175 0 0,1 200,50 Z"
          fill="url(#outfieldGrad)"
          stroke="#1a3a10"
          strokeWidth="2"
        />

        {/* Warning track */}
        <path
          d="M200,64 A161,161 0 0,1 361,225 L200,386 L39,225 A161,161 0 0,1 200,64 Z"
          fill="none"
          stroke="#b8956a"
          strokeWidth="14"
          opacity="0.9"
        />

        {/* Foul lines */}
        <line x1="200" y1="305" x2="30" y2="135" stroke="white" strokeWidth="1.5" opacity="0.55" />
        <line x1="200" y1="305" x2="370" y2="135" stroke="white" strokeWidth="1.5" opacity="0.55" />

        {/* Infield dirt diamond */}
        <polygon points="200,100 300,200 200,300 100,200" fill="url(#dirtGrad)" />

        {/* Infield grass circle */}
        <circle cx="200" cy="200" r="60" fill="url(#infieldGrassGrad)" />

        {/* Baselines */}
        <line x1="200" y1="300" x2="300" y2="200" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
        <line x1="300" y1="200" x2="200" y2="100" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
        <line x1="200" y1="100" x2="100" y2="200" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
        <line x1="100" y1="200" x2="200" y2="300" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />

        {/* Pitcher's mound */}
        <circle cx="200" cy="200" r="13" fill="#c9975c" stroke="#9e6e38" strokeWidth="1.5" />
        {/* Rubber */}
        <rect x="192" y="198" width="16" height="5" rx="1" fill="white" opacity="0.9" />

        {/* 2nd base */}
        <rect x="192" y="92" width="16" height="16" transform="rotate(45 200 100)" fill="white" stroke="#ccc" strokeWidth="1" />
        {/* 1st base */}
        <rect x="292" y="192" width="16" height="16" transform="rotate(45 300 200)" fill="white" stroke="#ccc" strokeWidth="1" />
        {/* 3rd base */}
        <rect x="92" y="192" width="16" height="16" transform="rotate(45 100 200)" fill="white" stroke="#ccc" strokeWidth="1" />

        {/* Home plate (pentagon) */}
        <polygon
          points="200,318 212,308 212,293 188,293 188,308"
          fill="white"
          stroke="#ccc"
          strokeWidth="1"
        />

        {/* Fielder position labels (hidden in interactive/creation mode) */}
        {!isInteractive && Object.entries(FIELDER_POSITIONS).map(([pos, { num, x, y }]) => {
          const isSelected = selectedPosition === pos;
          return (
            <g key={pos}>
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 11 : 9}
                fill={isSelected ? '#f59e0b' : 'rgba(0,0,0,0.4)'}
                stroke={isSelected ? '#d97706' : 'rgba(255,255,255,0.25)'}
                strokeWidth={isSelected ? 1.5 : 1}
              />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fontSize={isSelected ? 10 : 9}
                fontWeight="bold"
                fill={isSelected ? '#1a1a1a' : 'rgba(255,255,255,0.75)'}
              >
                {num}
              </text>
            </g>
          );
        })}

        {/* Base runners */}
        {baseRunners.first && (
          <circle cx="300" cy="200" r="10" fill="#3B82F6" stroke="white" strokeWidth="2" filter="url(#runnerGlow)" />
        )}
        {baseRunners.second && (
          <circle cx="200" cy="100" r="10" fill="#3B82F6" stroke="white" strokeWidth="2" filter="url(#runnerGlow)" />
        )}
        {baseRunners.third && (
          <circle cx="100" cy="200" r="10" fill="#3B82F6" stroke="white" strokeWidth="2" filter="url(#runnerGlow)" />
        )}

        {/* Ball path + ball */}
        {ballTarget && (
          isInteractive ? (
            <circle
              cx={ballTarget.x}
              cy={ballTarget.y}
              r="8"
              fill="white"
              stroke="#444"
              strokeWidth="1.5"
              filter="url(#ballShadow)"
            />
          ) : (
            <g key={ballKey}>
              {/* Layer 1: drawing animation — solid line that unrolls along the path */}
              <motion.path
                d={`M 200 305 L ${ballTarget.x} ${ballTarget.y}`}
                stroke="rgba(255, 230, 80, 0.55)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
              {/* Layer 2: dashed trail — fades in as drawing animation finishes */}
              <motion.path
                d={`M 200 305 L ${ballTarget.x} ${ballTarget.y}`}
                stroke="rgba(255, 230, 80, 0.75)"
                strokeWidth="2"
                strokeDasharray="7 5"
                strokeLinecap="round"
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.2 }}
              />
              {/* Layer 3: ball with spring physics */}
              <motion.circle
                initial={{ cx: 200, cy: 305 }}
                animate={{ cx: ballTarget.x, cy: ballTarget.y }}
                transition={{ type: 'spring', stiffness: 55, damping: 14 }}
                r="8"
                fill="white"
                stroke="#444"
                strokeWidth="1.5"
                filter="url(#ballShadow)"
              />
            </g>
          )
        )}
      </svg>

      {/* Outs indicator */}
      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md shadow">
        <div className="flex space-x-1 items-center">
          <span className="text-gray-400 text-xs mr-1">OUT</span>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full border ${
                i < outs ? 'bg-red-500 border-red-400' : 'bg-transparent border-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      {isInteractive && (
        <p className="mt-2 text-center text-xs text-gray-500">
          Click anywhere on the field to place the ball
        </p>
      )}
    </div>
  );
}

export default BaseRunnerDiagram;
