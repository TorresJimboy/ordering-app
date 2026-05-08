import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Header } from './components/Header';
import { useApp } from './contexts/AppContext';

export const Root: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthLoading } = useApp();
  
  const showHeader = user && location.pathname !== '/';

  useEffect(() => {
    if (!isAuthLoading && !user && location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, [isAuthLoading, location.pathname, navigate, user]);

  return (
    <div className="min-h-screen">
      {showHeader && <Header />}
      <Outlet />
    </div>
  );
};
