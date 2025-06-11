
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

  // Create 10 segments like in the reference image
  const segments = [
    { number: 1, color: 'bg-red-500' },
    { number: 2, color: 'bg-orange-500' },
    { number: 3, color: 'bg-yellow-400' },
    { number: 4, color: 'bg-green-500' },
    { number: 5, color: 'bg-emerald-600' },
    { number: 6, color: 'bg-cyan-500' },
    { number: 7, color: 'bg-blue-600' },
    { number: 8, color: 'bg-purple-600' },
    { number: 9, color: 'bg-violet-600' },
    { number: 10, color: 'bg-pink-500' }
  ];

  useEffect(() => {
    if (isSpinning) {
      const randomSpins = 5 + Math.random() * 5;
      const finalRotation = rotation + (randomSpins * 360);
      setRotation(finalRotation);
    }
  }, [isSpinning]);

  return (
    <div className="flex flex-col items-center space-y-4 sm:space-y-8 w-full max-w-md mx-auto">
      {/* Wheel Container */}
      <div className="relative flex items-center justify-center">
        <div className="relative w-72 h-72 sm:w-96 sm:h-96">
          {/* Main Wheel with segments */}
          <div 
            className={`w-full h-full rounded-full relative overflow-hidden shadow-2xl transition-transform duration-3000 ease-out border-4 border-white ${
              isSpinning ? 'animate-spin' : ''
            }`}
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionDuration: isSpinning ? '3s' : '0.5s'
            }}
          >
            {/* Number segments - 10 segments like the reference */}
            {segments.map((segment, index) => {
              const angle = (360 / segments.length) * index;
              const isUsed = usedNumbers.includes(segment.number);
              
              return (
                <div
                  key={segment.number}
                  className={`absolute w-full h-full ${segment.color} ${
                    isUsed ? 'opacity-30' : ''
                  }`}
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((angle + 36) * Math.PI / 180)}% ${50 - 50 * Math.sin((angle + 36) * Math.PI / 180)}%)`,
                    transform: `rotate(${angle}deg)`
                  }}
                >
                  <div 
                    className="absolute text-white font-bold text-xl sm:text-2xl flex items-center justify-center"
                    style={{
                      top: '20%',
                      left: '45%',
                      transform: `rotate(${-angle + 18}deg)`,
                      width: '30px',
                      height: '30px'
                    }}
                  >
                    {segment.number}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Hub - Dark circle with "Spin" text */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 bg-gray-900 rounded-full flex items-center justify-center shadow-lg z-10 border-2 border-white">
            <span className="text-white font-bold text-xs sm:text-sm">Spin</span>
          </div>

          {/* Pointer - pointing downward */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
            <div className="w-0 h-0 border-l-3 border-r-3 border-b-6 sm:border-l-4 sm:border-r-4 sm:border-b-8 border-l-transparent border-r-transparent border-b-white drop-shadow-lg"></div>
          </div>
        </div>

        {/* Roll Number Display */}
        {result && !isSpinning && (
          <div className="absolute -bottom-12 sm:-bottom-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-bold text-base sm:text-xl shadow-lg animate-bounce mx-2 text-center">
            Roll Number {result} please come on the stage
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full px-4 sm:px-0">
        <Button 
          onClick={onSpin}
          disabled={isSpinning || availableNumbers.length === 0}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-6 sm:py-3 sm:px-8 text-base sm:text-lg min-h-[48px] touch-manipulation flex-1"
        >
          {isSpinning ? 'Spinning...' : availableNumbers.length === 0 ? 'All Numbers Used!' : 'Spin the Wheel!'}
        </Button>

        <Button 
          onClick={onReset}
          variant="outline"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20 py-4 px-6 sm:py-3 sm:px-6 min-h-[48px] touch-manipulation"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Available Numbers Info */}
      <div className="text-white/70 text-sm text-center px-4">
        <p className="text-base sm:text-sm">Available numbers: {availableNumbers.length}/56</p>
        <p className="text-xs mt-1 hidden sm:block">Showing numbers 1-10 on wheel (all 56 numbers available for selection)</p>
      </div>
    </div>
  );
};

export default SpinningWheel;
