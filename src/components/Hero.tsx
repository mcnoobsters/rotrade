import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import heroImage from "@/assets/hero-trading.jpg";

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="relative bg-gradient-to-br from-background to-secondary py-20 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Safe & Secure
            <span className="bg-gradient-to-r from-trading-primary to-trading-success bg-clip-text text-transparent block">
              Roblox Trading
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Trade your Roblox items with confidence. Our platform ensures secure transactions, 
            verified users, and the best trading experience in the Roblox community.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            {user ? (
              <Link to="/post-trade">
                <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                  Post Trade Now
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                  Start Trading Now
                </Button>
              </Link>
            )}
            <Link to="/marketplace">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Browse Marketplace
              </Button>
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="text-center">
              <div className="bg-trading-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Shield className="h-8 w-8 text-trading-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Secure Trading</h3>
              <p className="text-sm text-muted-foreground">Protected transactions with middleman services</p>
            </div>
            
            <div className="text-center">
              <div className="bg-trading-success/10 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-trading-success" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Market Analytics</h3>
              <p className="text-sm text-muted-foreground">Real-time pricing and market trends</p>
            </div>
            
            <div className="text-center">
              <div className="bg-trading-warning/10 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Users className="h-8 w-8 text-trading-warning" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Trusted Community</h3>
              <p className="text-sm text-muted-foreground">Verified traders and reputation system</p>
            </div>
            
            <div className="text-center">
              <div className="bg-trading-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Zap className="h-8 w-8 text-trading-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Fast Trades</h3>
              <p className="text-sm text-muted-foreground">Quick and efficient trading process</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;