import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User } from 'lucide-react';

interface UserProfileProps {
  onClose?: () => void;
}

export default function UserProfile({ onClose }: UserProfileProps) {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      onClose?.();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  if (!currentUser) return null;

  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm border-white/20">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          User Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-2xl">
              {getInitials(currentUser.email || 'U')}
            </AvatarFallback>
          </Avatar>
          
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">
              {currentUser.displayName || 'User'}
            </p>
            <p className="text-sm text-gray-600">
              {currentUser.email}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Account Status</span>
            <span className="text-sm text-green-600 font-semibold">Active</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Email Verified</span>
            <span className={`text-sm font-semibold ${currentUser.emailVerified ? 'text-green-600' : 'text-orange-600'}`}>
              {currentUser.emailVerified ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        <Button 
          onClick={handleLogout}
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
}