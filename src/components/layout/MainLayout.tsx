
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Header from './Header';

const MainLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-dark-DEFAULT text-foreground flex flex-col">
      {isAuthenticated && <Header />}
      <main className="flex-1">
        <div className="container max-w-[1200px] mx-auto p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
