
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LoginForm from "@/components/LoginForm";
import UserProfile from "@/components/UserProfile";
import { User, LogIn } from "lucide-react";
import SpinningWheel from "@/components/SpinningWheel";

const Index = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [usedNumbers, setUsedNumbers] = useState<number[]>([]);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  
  const { currentUser } = useAuth();

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
    }, 3000);
  };

  const resetGame = () => {
    setUsedNumbers([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-2 sm:p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Auth Button */}
        <div className="absolute top-4 right-4 z-10">
          {currentUser ? (
            <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0 bg-transparent border-none">
                <UserProfile onClose={() => setShowProfileDialog(false)} />
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0 bg-transparent border-none">
                <LoginForm onClose={() => setShowLoginDialog(false)} />
              </DialogContent>
            </Dialog>
          )}
        </div>

        <header className="text-center py-4 sm:py-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent px-2">
            Who is Lucky Student
          </h1>
          {currentUser && (
            <p className="text-white/80 text-sm">
              Welcome back, {currentUser.email}!
            </p>
          )}
        </header>

        <div className="flex justify-center px-2">
          <SpinningWheel 
            isSpinning={isSpinning}
            result={result}
            usedNumbers={usedNumbers}
            onSpin={spinWheel}
            onReset={resetGame}
            availableNumbers={availableNumbers}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
