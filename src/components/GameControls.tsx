
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GameControlsProps {
  guess: number | null;
  setGuess: (guess: number | null) => void;
  onSpin: () => void;
  isSpinning: boolean;
  availableNumbers: number[];
  result: number | null;
}

const GameControls = ({ 
  guess, 
  setGuess, 
  onSpin, 
  isSpinning, 
  availableNumbers,
  result 
}: GameControlsProps) => {
  const handleGuessChange = (value: string) => {
    const num = parseInt(value);
    if (isNaN(num) || num < 1 || num > 56) {
      setGuess(null);
    } else {
      setGuess(num);
    }
  };

  const isGuessCorrect = result !== null && guess === result;
  const hasGuessed = guess !== null && result !== null;

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Make Your Guess</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="guess" className="text-white">
            Enter your guess (1-56):
          </Label>
          <Input
            id="guess"
            type="number"
            min="1"
            max="56"
            value={guess || ''}
            onChange={(e) => handleGuessChange(e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder-white/50"
            placeholder="Enter a number..."
            disabled={isSpinning}
          />
        </div>

        <Button 
          onClick={onSpin}
          disabled={isSpinning || availableNumbers.length === 0}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-3 text-lg"
        >
          {isSpinning ? 'Spinning...' : availableNumbers.length === 0 ? 'All Numbers Used!' : 'Spin the Wheel!'}
        </Button>

        {/* Guess Result */}
        {hasGuessed && (
          <div className={`p-4 rounded-lg text-center font-bold ${
            isGuessCorrect 
              ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
              : 'bg-red-500/20 text-red-300 border border-red-500/30'
          }`}>
            {isGuessCorrect ? '🎉 Correct! Well done!' : `❌ Wrong! You guessed ${guess}, result was ${result}`}
          </div>
        )}

        {/* Available Numbers Info */}
        <div className="text-white/70 text-sm">
          <p>Available numbers: {availableNumbers.length}/56</p>
          {availableNumbers.length <= 10 && availableNumbers.length > 0 && (
            <p className="mt-1">Remaining: {availableNumbers.join(', ')}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameControls;
