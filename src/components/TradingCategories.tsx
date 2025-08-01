import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, Crown, Gem, DollarSign, Star, Trophy } from "lucide-react";

const categories = [
  {
    title: "Pet Simulator X",
    icon: Gamepad2,
    description: "Trade rare pets, gems, and exclusive items",
    trades: "1,234 active trades",
    trending: true
  },
  {
    title: "Adopt Me",
    icon: Crown,
    description: "Pets, vehicles, toys, and rare collectibles",
    trades: "2,156 active trades",
    trending: true
  },
  {
    title: "Murder Mystery 2",
    icon: Gem,
    description: "Knives, guns, and exclusive weapon skins",
    trades: "856 active trades",
    trending: false
  },
  {
    title: "Robux & Gift Cards",
    icon: DollarSign,
    description: "Secure Robux and gift card exchanges",
    trades: "567 active trades",
    trending: false
  },
  {
    title: "Limited Items",
    icon: Star,
    description: "Rare limiteds and exclusive accessories",
    trades: "423 active trades",
    trending: true
  },
  {
    title: "Game Passes",
    icon: Trophy,
    description: "Premium game passes and developer products",
    trades: "234 active trades",
    trending: false
  }
];

const TradingCategories = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Popular Trading Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the most active trading categories and find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer relative overflow-hidden">
              {category.trending && (
                <div className="absolute top-4 right-4">
                  <span className="bg-trading-success text-white text-xs px-2 py-1 rounded-full font-medium">
                    Trending
                  </span>
                </div>
              )}
              
              <div className="flex items-start space-x-4 mb-4">
                <div className="bg-gradient-to-r from-trading-primary to-trading-success p-3 rounded-lg">
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {category.description}
                  </p>
                  <p className="text-trading-primary text-sm font-medium">
                    {category.trades}
                  </p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                Browse Category
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="trading" size="lg">
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TradingCategories;