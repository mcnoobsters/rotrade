import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TradingGuides = () => {
  const guides = [
    {
      title: "Getting Started",
      description: "Learn the basics of trading in Roblox games",
      content: "Understand item values, safe trading practices, and how to avoid scams."
    },
    {
      title: "Advanced Strategies",
      description: "Master the art of profitable trading",
      content: "Learn market analysis, timing your trades, and building valuable collections."
    },
    {
      title: "Safety First",
      description: "Stay safe while trading",
      content: "Use middleman services, verify trades, and protect your account."
    }
  ];

  return (
    <section id="guides" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Trading Guides</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Master the art of Roblox trading with our comprehensive guides
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {guides.map((guide, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{guide.title}</CardTitle>
                <CardDescription>{guide.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{guide.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TradingGuides;