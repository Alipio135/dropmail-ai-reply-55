
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from "@/hooks/use-toast";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    });
  };

  return (
    <header className="border-b border-border/40 bg-dark-lighter py-2">
      <div className="container max-w-[1200px] flex items-center justify-between mx-auto px-4">
        <Link to="/dashboard" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-coral to-turquoise bg-clip-text text-transparent">
            DropMail AI
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-muted-foreground hidden md:block">
              {user.email}
            </span>
          )}
          
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Settings size={20} />
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-coral" onClick={handleLogout}>
            <LogOut size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
