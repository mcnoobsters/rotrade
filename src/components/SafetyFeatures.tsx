import { Card } from "@/components/ui/card";
import { Shield, Eye, Users, Lock, CheckCircle, AlertTriangle } from "lucide-react";

const SafetyFeatures = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trade with Complete Safety
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our advanced security measures and verification systems ensure every trade is protected
          </p>
        </div>

        {/* Main Safety Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 text-center">
            <div className="bg-trading-success/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-8 w-8 text-trading-success" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Middleman Service</h3>
            <p className="text-muted-foreground">
              Our trusted middlemen hold items securely during trades, ensuring both parties get what they paid for.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-trading-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Eye className="h-8 w-8 text-trading-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Trade Monitoring</h3>
            <p className="text-muted-foreground">
              24/7 automated monitoring detects suspicious activity and prevents fraudulent trades in real-time.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-trading-warning/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-trading-warning" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Verified Users</h3>
            <p className="text-muted-foreground">
              Multi-step verification process ensures you're trading with legitimate, trusted community members.
            </p>
          </Card>
        </div>

        {/* Safety Stats */}
        <div className="bg-gradient-to-r from-trading-primary/5 to-trading-success/5 rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-trading-success mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Successful Trades</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-trading-primary mb-2">$2.5M+</div>
              <div className="text-sm text-muted-foreground">Protected Value</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-trading-warning mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Verified Traders</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-trading-success mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 border-trading-success/20">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-trading-success mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Safe Trading Tips</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Always use our middleman service for high-value trades</li>
                  <li>• Verify the trader's reputation before proceeding</li>
                  <li>• Screenshot all trade agreements</li>
                  <li>• Report suspicious behavior immediately</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-trading-warning/20">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-trading-warning mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">Red Flags to Avoid</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Requests to trade outside our platform</li>
                  <li>• Unusually low prices for rare items</li>
                  <li>• Pressure to complete trades quickly</li>
                  <li>• Traders with no verification badges</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SafetyFeatures;