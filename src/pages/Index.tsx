
import { useState, useEffect } from "react";
import SpinningWheel from "@/components/SpinningWheel";
import GameControls from "@/components/GameControls";
import GameStats from "@/components/GameStats";

const Index = () => {
  const [guess, setGuess] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [usedNumbers, setUsedNumbers] = useState<number[]>([]);
  const [gameStats, setGameStats] = useState({
    total: 0,
    correct: 0,
    streak: 0,
    bestStreak: 0
  });

  const availableNumbers = Array.from({length: 56}, (_, i) => i + 1)
    .filter(num => !usedNumbers.includes(num));

  const spinWheel = () => {
    if (availableNumbers.length === 0) {
      // Reset if all numbers have been used
      setUsedNumbers([]);
      return;
    }

    setIsSpinning(true);
    setResult(null);

    // Simulate spinning delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const spinResult = availableNumbers[randomIndex];
      
      setResult(spinResult);
      setUsedNumbers(prev => [...prev, spinResult]);
      setIsSpinning(false);

      // Update stats
      if (guess !== null) {
        const isCorrect = guess === spinResult;
        setGameStats(prev => ({
          total: prev.total + 1,
          correct: prev.correct + (isCorrect ? 1 : 0),
          streak: isCorrect ? prev.streak + 1 : 0,
          bestStreak: isCorrect ? Math.max(prev.bestStreak, prev.streak + 1) : prev.bestStreak
        }));
      }
    }, 3000);
  };

  const resetGame = () => {
    setUsedNumbers([]);
    setResult(null);
    setGuess(null);
    setGameStats({
      total: 0,
      correct: 0,
      streak: 0,
      bestStreak: 0
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="container mx-auto max-w-6xl">
        <header className="text-center py-8">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Spinning Wheel Challenge
          </h1>
          <p className="text-xl text-gray-300">
            Guess the number before you spin! Numbers 1-56, no repeats until reset.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 flex justify-center">
            <SpinningWheel 
              isSpinning={isSpinning}
              result={result}
              usedNumbers={usedNumbers}
            />
          </div>
          
          <div className="space-y-6">
            <GameControls 
              guess={guess}
              setGuess={setGuess}
              onSpin={spinWheel}
              isSpinning={isSpinning}
              availableNumbers={availableNumbers}
              result={result}
            />
            
            <GameStats 
              stats={gameStats}
              onReset={resetGame}
              usedCount={usedNumbers.length}
              totalNumbers={56}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
