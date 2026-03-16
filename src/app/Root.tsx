import React from 'react';
import { Outlet, useLocation } from 'react-router';
import { Header } from './components/Header';
import { useApp } from './contexts/AppContext';

export const Root: React.FC = () => {
  const location = useLocation();
  const { user } = useApp();
  
  const showHeader = user && location.pathname !== '/';

  return (
    <div className="min-h-screen">
      {showHeader && <Header />}
      <Outlet />
    </div>
  );
};
