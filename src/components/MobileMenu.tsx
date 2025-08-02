import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { ShoppingCart, User, Menu, TrendingUp, LogOut, Plus, Moon, Sun } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "next-themes";

const MobileMenu = () => {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-3 pb-6 border-b">
            <div className="bg-gradient-to-r from-trading-primary to-trading-success p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">RoTrade</h1>
              <p className="text-sm text-muted-foreground">Roblox Trading Hub</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col space-y-4 py-6 flex-1">
            <Link 
              to="/marketplace" 
              className="text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted"
              onClick={closeMenu}
            >
              Marketplace
            </Link>
            {user && (
              <Link 
                to="/dashboard" 
                className="text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted"
                onClick={closeMenu}
              >
                My Trades
              </Link>
            )}
            <button 
              onClick={() => {
                closeMenu();
                document.getElementById('guides')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted text-left"
            >
              Trading Guides
            </button>
            <button 
              onClick={() => {
                closeMenu();
                document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted text-left"
            >
              Support
            </button>
          </nav>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-2 rounded-md border">
            <div className="flex items-center space-x-3">
              {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span className="text-sm font-medium">Dark Mode</span>
            </div>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-6 border-t">
            {user ? (
              <>
                <Link to="/post-trade" onClick={closeMenu}>
                  <Button variant="trading" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Post Trade
                  </Button>
                </Link>
                <Link to="/dashboard" onClick={closeMenu}>
                  <Button variant="outline" className="w-full">
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" className="w-full" onClick={() => { closeMenu(); signOut(); }}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/auth" onClick={closeMenu}>
                <Button variant="trading" className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;