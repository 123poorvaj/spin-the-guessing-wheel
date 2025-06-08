
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw, Target, TrendingUp, Zap } from "lucide-react";

interface GameStatsProps {
  stats: {
    total: number;
    correct: number;
    streak: number;
    bestStreak: number;
  };
  onReset: () => void;
  usedCount: number;
  totalNumbers: number;
}

const GameStats = ({ stats, onReset, usedCount, totalNumbers }: GameStatsProps) => {
  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-2xl flex items-center gap-2">
          <Target className="w-6 h-6" />
          Game Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-500/20 p-3 rounded-lg text-center border border-blue-500/30">
            <div className="text-2xl font-bold text-blue-300">{stats.total}</div>
            <div className="text-sm text-blue-200">Total Spins</div>
          </div>
          
          <div className="bg-green-500/20 p-3 rounded-lg text-center border border-green-500/30">
            <div className="text-2xl font-bold text-green-300">{stats.correct}</div>
            <div className="text-sm text-green-200">Correct</div>
          </div>
          
          <div className="bg-purple-500/20 p-3 rounded-lg text-center border border-purple-500/30">
            <div className="text-2xl font-bold text-purple-300">{accuracy}%</div>
            <div className="text-sm text-purple-200">Accuracy</div>
          </div>
          
          <div className="bg-yellow-500/20 p-3 rounded-lg text-center border border-yellow-500/30">
            <div className="text-2xl font-bold text-yellow-300">{stats.streak}</div>
            <div className="text-sm text-yellow-200">Current Streak</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-white">
            <span className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Best Streak:
            </span>
            <span className="font-bold">{stats.bestStreak}</span>
          </div>
          
          <div className="flex items-center justify-between text-white">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Numbers Used:
            </span>
            <span className="font-bold">{usedCount}/{totalNumbers}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-white">
            <span>Progress</span>
            <span>{Math.round((usedCount / totalNumbers) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(usedCount / totalNumbers) * 100}%` }}
            ></div>
          </div>
        </div>

        <Button 
          onClick={onReset}
          variant="outline"
          className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Game
        </Button>
      </CardContent>
    </Card>
  );
};

export default GameStats;
