
import { useEffect, useState } from "react";

interface SpinningWheelProps {
  isSpinning: boolean;
  result: number | null;
  usedNumbers: number[];
}

const SpinningWheel = ({ isSpinning, result, usedNumbers }: SpinningWheelProps) => {
  const [rotation, setRotation] = useState(0);

  // Generate wheel segments for numbers 1-8 (visible on wheel)
  const wheelSegments = Array.from({length: 8}, (_, i) => i + 1);
  
  const segmentColors = [
    'from-red-500 to-red-600',
    'from-orange-500 to-orange-600', 
    'from-yellow-500 to-yellow-600',
    'from-green-500 to-green-600',
    'from-emerald-500 to-emerald-600',
    'from-cyan-500 to-cyan-600',
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-pink-500 to-pink-600',
    'from-rose-500 to-rose-600'
  ];

  useEffect(() => {
    if (isSpinning) {
      const randomSpins = 5 + Math.random() * 5; // 5-10 full rotations
      const finalRotation = rotation + (randomSpins * 360);
      setRotation(finalRotation);
    }
  }, [isSpinning]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Wheel Container */}
      <div className="relative w-96 h-96">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 p-2">
          {/* Main Wheel */}
          <div 
            className={`w-full h-full rounded-full relative overflow-hidden shadow-2xl transition-transform duration-3000 ease-out ${
              isSpinning ? 'animate-spin' : ''
            }`}
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionDuration: isSpinning ? '3s' : '0.5s'
            }}
          >
            {/* Wheel Segments */}
            {wheelSegments.map((number, index) => {
              const angle = (360 / wheelSegments.length) * index;
              const isUsed = usedNumbers.includes(number);
              
              return (
                <div
                  key={number}
                  className={`absolute w-full h-full bg-gradient-to-r ${segmentColors[index]} ${
                    isUsed ? 'opacity-50' : ''
                  }`}
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((angle + 45) * Math.PI / 180)}% ${50 - 50 * Math.sin((angle + 45) * Math.PI / 180)}%)`,
                    transform: `rotate(${angle}deg)`
                  }}
                >
                  <div 
                    className="absolute text-white font-bold text-2xl"
                    style={{
                      top: '25%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {number}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Hub */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-sm">SPIN</span>
        </div>

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-yellow-400 drop-shadow-lg"></div>
        </div>
      </div>

      {/* Result Display */}
      {result && !isSpinning && (
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg animate-bounce">
          Result: {result}
        </div>
      )}
    </div>
  );
};

export default SpinningWheel;
