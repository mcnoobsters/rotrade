import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Shield, TrendingUp } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Trade {
  id: string;
  title: string;
  price_robux: number;
  original_price_robux: number;
  item_icon: string;
  game: string;
  item_type: string;
  featured: boolean;
  trending: boolean;
  expires_at: string;
  created_at: string;
  profiles: {
    username: string;
    verified: boolean;
    rating: number;
    total_trades: number;
  };
}


const FeaturedTrades = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchFeaturedTrades();
  }, []);

  const fetchFeaturedTrades = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('trades')
        .select(`
          *,
          profiles!trades_seller_id_fkey (
            username,
            verified,
            rating,
            total_trades
          )
        `)
        .eq('status', 'active')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(8);

      if (error) throw error;
      setTrades(data || []);
    } catch (error) {
      console.error('Error fetching trades:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTradeClick = (trade: Trade) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to make an offer on this trade.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Trade Interest",
      description: `Interested in ${trade.title}? Contact the seller to negotiate.`,
    });
  };

  const formatTimeLeft = (expiresAt: string) => {
    if (!expiresAt) return 'No expiry';
    
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  if (loading) {
    return (
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading featured trades...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Trades
            </h2>
            <p className="text-lg text-muted-foreground">
              Hand-picked deals from verified sellers with the best prices
            </p>
          </div>
          <Button variant="outline">View All</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trades.map((trade) => (
            <Card key={trade.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
              {/* Image/Icon Section */}
              <div className="relative bg-gradient-to-br from-trading-primary/10 to-trading-success/10 p-8 text-center">
                <div className="text-5xl mb-4">{trade.item_icon}</div>
                {trade.trending && (
                  <Badge className="absolute top-3 right-3 bg-trading-success">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Hot
                  </Badge>
                )}
              </div>

              <div className="p-4">
                {/* Title */}
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                  {trade.title}
                </h3>

                {/* Price Section */}
                <div className="mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-trading-success">
                      {trade.price_robux.toLocaleString()} Robux
                    </span>
                    {trade.original_price_robux && (
                      <span className="text-sm text-muted-foreground line-through">
                        {trade.original_price_robux.toLocaleString()} Robux
                      </span>
                    )}
                  </div>
                </div>

                {/* Seller Info */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-muted-foreground">by</span>
                    <span className="text-sm font-medium text-foreground">
                      {trade.profiles?.username || 'Unknown'}
                    </span>
                    {trade.profiles?.verified && (
                      <Shield className="h-3 w-3 text-trading-success" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-muted-foreground">
                      {trade.profiles?.rating?.toFixed(1) || '0.0'} ({trade.profiles?.total_trades || 0})
                    </span>
                  </div>
                </div>

                {/* Time Left */}
                <div className="flex items-center space-x-1 mb-4">
                  <Clock className="h-3 w-3 text-trading-warning" />
                  <span className="text-xs text-trading-warning font-medium">
                    {formatTimeLeft(trade.expires_at)} left
                  </span>
                </div>

                {/* Action Button */}
                <Button 
                  variant="trading" 
                  className="w-full" 
                  size="sm"
                  onClick={() => handleTradeClick(trade)}
                >
                  Trade Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {trades.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              No featured trades available at the moment.
            </div>
            <p className="text-sm text-muted-foreground">
              Check back later for new trading opportunities!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedTrades;