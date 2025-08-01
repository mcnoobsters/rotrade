import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Shield, TrendingUp } from "lucide-react";

const featuredTrades = [
  {
    id: 1,
    title: "Rare Dragon Pet - Pet Simulator X",
    price: "15,000 Robux",
    originalPrice: "18,000 Robux",
    seller: "TradeMaster99",
    rating: 4.9,
    trades: 147,
    timeLeft: "2h 35m",
    image: "🐉",
    verified: true,
    trending: true
  },
  {
    id: 2,
    title: "Neon Shadow Dragon - Adopt Me",
    price: "25,000 Robux",
    originalPrice: "30,000 Robux",
    seller: "PetTrader2024",
    rating: 5.0,
    trades: 89,
    timeLeft: "1h 15m",
    image: "🐲",
    verified: true,
    trending: false
  },
  {
    id: 3,
    title: "Chroma Luger - MM2",
    price: "8,500 Robux",
    originalPrice: "10,000 Robux",
    seller: "WeaponDealer",
    rating: 4.8,
    trades: 203,
    timeLeft: "5h 42m",
    image: "🔫",
    verified: true,
    trending: true
  },
  {
    id: 4,
    title: "Dominus Empyreus",
    price: "750,000 Robux",
    originalPrice: "850,000 Robux",
    seller: "LimitedKing",
    rating: 4.9,
    trades: 12,
    timeLeft: "12h 18m",
    image: "👑",
    verified: true,
    trending: false
  }
];

const FeaturedTrades = () => {
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
          {featuredTrades.map((trade) => (
            <Card key={trade.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
              {/* Image/Icon Section */}
              <div className="relative bg-gradient-to-br from-trading-primary/10 to-trading-success/10 p-8 text-center">
                <div className="text-5xl mb-4">{trade.image}</div>
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
                      {trade.price}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {trade.originalPrice}
                    </span>
                  </div>
                </div>

                {/* Seller Info */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-muted-foreground">by</span>
                    <span className="text-sm font-medium text-foreground">
                      {trade.seller}
                    </span>
                    {trade.verified && (
                      <Shield className="h-3 w-3 text-trading-success" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-muted-foreground">
                      {trade.rating} ({trade.trades})
                    </span>
                  </div>
                </div>

                {/* Time Left */}
                <div className="flex items-center space-x-1 mb-4">
                  <Clock className="h-3 w-3 text-trading-warning" />
                  <span className="text-xs text-trading-warning font-medium">
                    {trade.timeLeft} left
                  </span>
                </div>

                {/* Action Button */}
                <Button variant="trading" className="w-full" size="sm">
                  Trade Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTrades;