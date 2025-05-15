import React, { useEffect, useState } from 'react';

function BaseRunnerDiagram({ baseRunners, outs, ballLocation }) {
  const [showBall, setShowBall] = useState(false);
  const [ballPosition, setBallPosition] = useState({ x: 200, y: 300 }); // Start at home plate
  const [isTraveling, setIsTraveling] = useState(false);

  useEffect(() => {
    if (ballLocation) {
      setShowBall(true);
      setIsTraveling(true);
      setBallPosition({ x: 200, y: 300 }); // Reset to home plate
      
      // Animate to final position
      const startTime = Date.now();
      const duration = 2000; // 2 seconds animation
      const startX = 200;
      const startY = 300;
      const endX = ballLocation.x;
      const endY = ballLocation.y;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic function for smooth deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        const currentX = startX + (endX - startX) * easeOut;
        const currentY = startY + (endY - startY) * easeOut;
        
        setBallPosition({ x: currentX, y: currentY });

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsTraveling(false); // Animation complete
        }
      };

      requestAnimationFrame(animate);
    } else {
      setShowBall(false);
      setIsTraveling(false);
    }
  }, [ballLocation]);

  return (
    <div className="relative w-64 h-64 mx-auto mb-6">
      <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Green field (cone with curved top) */}
        <path d="M200,50 
                 A175,175 0 0,1 375,225 
                 L200,400 
                 L25,225 
                 A175,175 0 0,1 200,50 
                 Z" 
              fill="green" stroke="black" strokeWidth="2"/>

        {/* Infield (Brown diamond) */}
        <polygon points="200,100 300,200 200,300 100,200" fill="#d2b48c" stroke="black" strokeWidth="2"/>

        {/* Bases */}
        <rect x="192" y="92" width="16" height="16" transform="rotate(45 200 100)" fill="white" stroke="black"/> {/* 2B */}
        <rect x="292" y="192" width="16" height="16" transform="rotate(45 300 200)" fill="white" stroke="black"/> {/* 1B */}
        <rect x="92" y="192" width="16" height="16" transform="rotate(45 100 200)" fill="white" stroke="black"/> {/* 3B */}

        {/* Pitcher's mound */}
        <circle cx="200" cy="200" r="10" fill="#c2b280" stroke="black" strokeWidth="1"/>

        {/* Home plate (inset into arc) */}
        <circle cx="200" cy="300" r="30" fill="#d2b48c" stroke="black" strokeWidth="2"/>
        <polygon points="200,295 210,305 200,315 190,305" fill="white" stroke="black" strokeWidth="1"/>

        {/* Runners */}
        {baseRunners.first && (
          <circle cx="300" cy="200" r="8" fill="#3B82F6" stroke="white" strokeWidth="2" />
        )}
        {baseRunners.second && (
          <circle cx="200" cy="100" r="8" fill="#3B82F6" stroke="white" strokeWidth="2" />
        )}
        {baseRunners.third && (
          <circle cx="100" cy="200" r="8" fill="#3B82F6" stroke="white" strokeWidth="2" />
        )}

        {/* Ball with Travel Animation */}
        {showBall && (
          <>
            <circle 
              cx={ballPosition.x} 
              cy={ballPosition.y} 
              r="8" 
              fill="white" 
              stroke="black" 
              strokeWidth="1.5"
              className={!isTraveling ? "animate-[bounce_1s_ease-in-out_infinite]" : ""}
            />
            <circle 
              cx={ballPosition.x} 
              cy={ballPosition.y} 
              r="6" 
              fill="red" 
              stroke="none"
              className={!isTraveling ? "animate-[bounce_1s_ease-in-out_infinite]" : ""}
            />
          </>
        )}
      </svg>

      {/* Outs indicator */}
      <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded-md shadow-md">
        <div className="flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < outs ? 'bg-red-500' : 'bg-gray-200'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BaseRunnerDiagram; 