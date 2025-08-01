import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, Shield, TrendingUp, Search, Filter } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Trade {
  id: string;
  title: string;
  description: string;
  price_robux: number;
  original_price_robux: number;
  item_icon: string;
  game: string;
  item_type: string;
  status: string;
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

const categories = [
  "All",
  "Grow A Garden",
  "Adopt Me", 
  "Murder Mystery 2",
  "Robux & Gift Cards",
  "Limited Items",
  "Game Passes",
  "Arsenal",
  "Other"
];

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState('all');
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchTrades();
  }, [selectedCategory, sortBy, priceRange]);

  useEffect(() => {
    // Update URL when category changes
    if (selectedCategory !== 'All') {
      setSearchParams({ category: selectedCategory });
    } else {
      setSearchParams({});
    }
  }, [selectedCategory, setSearchParams]);

  const fetchTrades = async () => {
    try {
      setLoading(true);
      let query = (supabase as any)
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
        .eq('status', 'active');

      // Filter by category
      if (selectedCategory !== 'All') {
        query = query.eq('game', selectedCategory);
      }

      // Filter by price range
      if (priceRange !== 'all') {
        switch (priceRange) {
          case 'under1k':
            query = query.lt('price_robux', 1000);
            break;
          case '1k-10k':
            query = query.gte('price_robux', 1000).lte('price_robux', 10000);
            break;
          case '10k-100k':
            query = query.gte('price_robux', 10000).lte('price_robux', 100000);
            break;
          case 'over100k':
            query = query.gt('price_robux', 100000);
            break;
        }
      }

      // Sort by selected option
      switch (sortBy) {
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'oldest':
          query = query.order('created_at', { ascending: true });
          break;
        case 'price_low':
          query = query.order('price_robux', { ascending: true });
          break;
        case 'price_high':
          query = query.order('price_robux', { ascending: false });
          break;
        case 'trending':
          query = query.eq('trending', true).order('created_at', { ascending: false });
          break;
      }

      const { data, error } = await query.limit(50);

      if (error) throw error;
      setTrades(data || []);
    } catch (error) {
      console.error('Error fetching trades:', error);
      toast({
        title: "Error",
        description: "Failed to load trades. Please try again.",
        variant: "destructive",
      });
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
      description: `Interested in ${trade.title}? Contact ${trade.profiles?.username} to negotiate.`,
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

  const filteredTrades = trades.filter(trade =>
    trade.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trade.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trade.game.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Marketplace
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover and trade Roblox items from verified sellers
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search trades..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
              </SelectContent>
            </Select>

            {/* Price Range */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under1k">Under 1,000 Robux</SelectItem>
                <SelectItem value="1k-10k">1K - 10K Robux</SelectItem>
                <SelectItem value="10k-100k">10K - 100K Robux</SelectItem>
                <SelectItem value="over100k">Over 100K Robux</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid grid-cols-3 lg:grid-cols-9 w-full">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="text-xs lg:text-sm"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            {loading ? 'Loading...' : `Found ${filteredTrades.length} trades`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Trades Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="bg-muted h-40"></div>
                <div className="p-4 space-y-2">
                  <div className="bg-muted h-4 rounded"></div>
                  <div className="bg-muted h-3 rounded w-2/3"></div>
                  <div className="bg-muted h-3 rounded w-1/2"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : filteredTrades.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-muted-foreground mb-4">
              {searchQuery ? 
                `No trades found matching "${searchQuery}"` : 
                `No trades found in ${selectedCategory === 'All' ? 'any category' : selectedCategory}`
              }
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setPriceRange('all');
              }}
            >
              Clear Filters
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTrades.map((trade) => (
              <Card key={trade.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                {/* Image/Icon Section */}
                <div className="relative bg-gradient-to-br from-trading-primary/10 to-trading-success/10 p-6 text-center">
                  <div className="text-4xl mb-2">{trade.item_icon}</div>
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

                  {/* Game & Type */}
                  <div className="text-xs text-muted-foreground mb-2">
                    {trade.game} • {trade.item_type}
                  </div>

                  {/* Price Section */}
                  <div className="mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-trading-success">
                        {trade.price_robux.toLocaleString()} Robux
                      </span>
                      {trade.original_price_robux && (
                        <span className="text-sm text-muted-foreground line-through">
                          {trade.original_price_robux.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Seller Info */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-muted-foreground">by</span>
                      <span className="text-xs font-medium text-foreground">
                        {trade.profiles?.username || 'Unknown'}
                      </span>
                      {trade.profiles?.verified && (
                        <Shield className="h-3 w-3 text-trading-success" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-muted-foreground">
                        {trade.profiles?.rating?.toFixed(1) || '0.0'}
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
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Marketplace;