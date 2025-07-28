import React from 'react';
import { Button } from "@/components/ui/button";
import { Trophy, Settings, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <header className="bg-gradient-primary border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="text-3xl">⚡</div>
            <div>
              <h1 className="text-xl font-bold text-foreground">SPARK</h1>
              <p className="text-xs text-muted-foreground">The Patrician Pulse</p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Button
              variant={location.pathname === '/' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Button>
            
            <Button
              variant={location.pathname === '/results' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigate('/results')}
              className="flex items-center space-x-2"
            >
              <Trophy className="h-4 w-4" />
              <span>Results</span>
            </Button>
            
            <Button
              variant={location.pathname === '/admin' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigate('/admin')}
              className="flex items-center space-x-2"
            >
              <Settings className="h-4 w-4" />
              <span>Admin</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;