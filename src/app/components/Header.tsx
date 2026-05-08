import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';
import { Shield, ShoppingCart, User, LogOut, History, Settings, Menu } from 'lucide-react';
import { Badge } from './ui/badge';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Separator } from './ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

export const Header: React.FC = () => {
  const { user, isAdmin, logout, cart } = useApp();
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate('/', { replace: true });
    await logout();
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const logoutDialog = (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-foreground hover:text-destructive md:w-auto md:justify-center"
        >
          <LogOut className="w-5 h-5" />
          <span className="md:hidden">Log out</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log out?</AlertDialogTitle>
          <AlertDialogDescription>
            You will need to sign in again to view your cart and orders.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>
            Log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b-2 border-primary/30">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link to="/catalog" className="flex min-w-0 items-center gap-3 hover:opacity-80 transition-opacity">
            <Shield className="h-7 w-7 flex-shrink-0 text-primary md:h-8 md:w-8" />
            <h2 className="truncate text-primary text-xl md:text-2xl">The Armory</h2>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
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

                {isAdmin && (
                  <Link to="/admin/products">
                    <Button variant="ghost" className="text-foreground hover:text-primary">
                      <Settings className="w-5 h-5 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}

                <div className="flex items-center gap-2 px-3 py-1 bg-secondary/50 rounded-md">
                  <User className="w-4 h-4 text-primary" />
                  <span className="max-w-28 truncate text-sm">{user.name}</span>
                </div>

                {logoutDialog}
              </>
            )}
          </nav>

          {user && (
            <div className="flex items-center gap-2 lg:hidden">
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center px-1 text-xs">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[min(22rem,85vw)] border-primary/30 bg-card">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2 text-primary">
                      <Shield className="h-5 w-5" />
                      The Armory
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex items-center gap-3 px-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary/60">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{user.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-col gap-2 px-4">
                    <SheetClose asChild>
                      <Link to="/catalog">
                        <Button variant="ghost" className="w-full justify-start">
                          <Shield className="mr-2 h-5 w-5" />
                          Catalog
                        </Button>
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link to="/orders">
                        <Button variant="ghost" className="w-full justify-start">
                          <History className="mr-2 h-5 w-5" />
                          Orders
                        </Button>
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link to="/cart">
                        <Button variant="ghost" className="w-full justify-start">
                          <ShoppingCart className="mr-2 h-5 w-5" />
                          Cart
                          {cartItemCount > 0 && (
                            <Badge className="ml-auto">{cartItemCount}</Badge>
                          )}
                        </Button>
                      </Link>
                    </SheetClose>

                    {isAdmin && (
                      <SheetClose asChild>
                        <Link to="/admin/products">
                          <Button variant="ghost" className="w-full justify-start">
                            <Settings className="mr-2 h-5 w-5" />
                            Admin
                          </Button>
                        </Link>
                      </SheetClose>
                    )}
                  </div>

                  <div className="mt-auto px-4 pb-4">
                    {logoutDialog}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
