
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface SpinningWheelProps {
  isSpinning: boolean;
  result: number | null;
  usedNumbers: number[];
  onSpin: () => void;
  onReset: () => void;
  availableNumbers: number[];
}

const SpinningWheel = ({ 
  isSpinning, 
  result, 
  usedNumbers, 
  onSpin, 
  onReset, 
  availableNumbers 
}: SpinningWheelProps) => {
  const [rotation, setRotation] = useState(0);

  // Generate all numbers 1-56 for display around the wheel
  const allNumbers = Array.from({length: 56}, (_, i) => i + 1);
  
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
    <div className="flex flex-col items-center space-y-8">
      {/* Wheel Container */}
      <div className="relative flex items-center justify-center">
        <div className="relative w-96 h-96">
          {/* Outer Ring with Numbers */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 p-2">
            {/* Numbers around the wheel */}
            {allNumbers.map((number, index) => {
              const angle = (360 / allNumbers.length) * index;
              const isUsed = usedNumbers.includes(number);
              const radius = 180; // Distance from center
              const x = 50 + (radius / 5) * Math.cos((angle - 90) * Math.PI / 180);
              const y = 50 + (radius / 5) * Math.sin((angle - 90) * Math.PI / 180);
              
              return (
                <div
                  key={number}
                  className={`absolute text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                    isUsed ? 'text-gray-500 bg-gray-200' : 'text-white bg-gray-800'
                  }`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {number}
                </div>
              );
            })}

            {/* Main Wheel */}
            <div 
              className={`w-full h-full rounded-full relative overflow-hidden shadow-2xl transition-transform duration-3000 ease-out bg-gradient-to-br from-gray-600 to-gray-800 ${
                isSpinning ? 'animate-spin' : ''
              }`}
              style={{
                transform: `rotate(${rotation}deg)`,
                transitionDuration: isSpinning ? '3s' : '0.5s'
              }}
            >
              {/* Decorative segments */}
              {Array.from({length: 8}).map((_, index) => {
                const angle = (360 / 8) * index;
                
                return (
                  <div
                    key={index}
                    className={`absolute w-full h-full bg-gradient-to-r ${segmentColors[index]} opacity-30`}
                    style={{
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((angle + 45) * Math.PI / 180)}% ${50 - 50 * Math.sin((angle + 45) * Math.PI / 180)}%)`,
                      transform: `rotate(${angle}deg)`
                    }}
                  />
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

        {/* Roll Number Display */}
        {result && !isSpinning && (
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg animate-bounce">
            Roll Number: {result}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <Button 
          onClick={onSpin}
          disabled={isSpinning || availableNumbers.length === 0}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-3 px-8 text-lg"
        >
          {isSpinning ? 'Spinning...' : availableNumbers.length === 0 ? 'All Numbers Used!' : 'Spin the Wheel!'}
        </Button>

        <Button 
          onClick={onReset}
          variant="outline"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20 py-3 px-6"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Available Numbers Info */}
      <div className="text-white/70 text-sm text-center">
        <p>Available numbers: {availableNumbers.length}/56</p>
      </div>
    </div>
  );
};

export default SpinningWheel;
