import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';
import { Shield, ShoppingCart, User, LogOut, History } from 'lucide-react';
import { Badge } from './ui/badge';

export const Header: React.FC = () => {
  const { user, logout, cart } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b-2 border-primary/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/catalog" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Shield className="w-8 h-8 text-primary" />
            <h2 className="text-primary">The Armory</h2>
          </Link>

          <nav className="flex items-center gap-4">
            {user && (
              <>
                <Link to="/catalog">
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    Catalog
                  </Button>
                </Link>
                
                <Link to="/orders" className="relative">
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    <History className="w-5 h-5 mr-2" />
                    Orders
                  </Button>
                </Link>

                <Link to="/cart" className="relative">
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Cart
                    {cartItemCount > 0 && (
                      <Badge className="ml-2 bg-primary text-primary-foreground">
                        {cartItemCount}
                      </Badge>
                    )}
                  </Button>
                </Link>

                <div className="flex items-center gap-2 px-3 py-1 bg-secondary/50 rounded-md">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-sm">{user.name}</span>
                </div>

                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-foreground hover:text-destructive"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
