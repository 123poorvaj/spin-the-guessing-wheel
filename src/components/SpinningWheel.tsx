
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

  // Display numbers around the wheel (showing first 20 numbers for visibility)
  const displayNumbers = Array.from({length: 20}, (_, i) => i + 1);
  
  const segmentColors = [
    'bg-red-500',
    'bg-orange-500', 
    'bg-yellow-500',
    'bg-green-500',
    'bg-emerald-500',
    'bg-cyan-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-rose-500',
    'bg-teal-500',
    'bg-lime-500',
    'bg-amber-500',
    'bg-violet-500',
    'bg-fuchsia-500',
    'bg-sky-500',
    'bg-slate-500',
    'bg-gray-500',
    'bg-zinc-500'
  ];

  useEffect(() => {
    if (isSpinning) {
      const randomSpins = 5 + Math.random() * 5;
      const finalRotation = rotation + (randomSpins * 360);
      setRotation(finalRotation);
    }
  }, [isSpinning]);

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Wheel Container */}
      <div className="relative flex items-center justify-center">
        <div className="relative w-96 h-96">
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
            {/* Number segments */}
            {displayNumbers.map((number, index) => {
              const angle = (360 / displayNumbers.length) * index;
              const isUsed = usedNumbers.includes(number);
              
              return (
                <div
                  key={number}
                  className={`absolute w-full h-full ${segmentColors[index % segmentColors.length]} ${
                    isUsed ? 'opacity-30' : ''
                  }`}
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((angle + 18) * Math.PI / 180)}% ${50 - 50 * Math.sin((angle + 18) * Math.PI / 180)}%)`,
                    transform: `rotate(${angle}deg)`
                  }}
                >
                  <div 
                    className="absolute text-white font-bold text-lg flex items-center justify-center"
                    style={{
                      top: '15%',
                      left: '45%',
                      transform: `rotate(${-angle + 9}deg)`,
                      width: '20px',
                      height: '20px'
                    }}
                  >
                    {number}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center shadow-lg z-10">
            <span className="text-white font-bold text-sm">SPIN</span>
          </div>

          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
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
        <p className="text-xs mt-1">Showing numbers 1-20 on wheel (all 56 numbers available for selection)</p>
      </div>
    </div>
  );
};

export default SpinningWheel;
