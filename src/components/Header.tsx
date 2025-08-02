import { Button } from "@/components/ui/button";
import { ShoppingCart, User, TrendingUp, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-trading-primary to-trading-success p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">RoTrade</h1>
              <p className="text-sm text-muted-foreground">Roblox Trading Hub</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/marketplace" className="text-foreground hover:text-primary transition-colors">
              Marketplace
            </Link>
            {user && (
              <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
                My Trades
              </Link>
            )}
            <button 
              onClick={() => document.getElementById('guides')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-foreground hover:text-primary transition-colors"
            >
              Trading Guides
            </button>
            <button 
              onClick={() => document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-foreground hover:text-primary transition-colors"
            >
              Support
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {user && (
              <>
                <Link to="/post-trade">
                  <Button variant="trading" size="sm" className="hidden sm:flex">
                    Post Trade
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                </Button>
              </>
            )}
            {user ? (
              <div className="flex items-center space-x-2">
                <Link to="/dashboard">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={signOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="trading" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;