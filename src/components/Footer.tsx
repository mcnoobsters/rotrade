import { TrendingUp, Twitter, MessageCircle, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-trading-primary to-trading-success p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">CrossTrade</h3>
                <p className="text-sm text-muted-foreground">Roblox Trading Hub</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              The most trusted platform for safe Roblox trading. Join thousands of verified traders in our secure marketplace.
            </p>
            <div className="flex space-x-3">
              <div className="bg-trading-primary/10 p-2 rounded-lg hover:bg-trading-primary/20 transition-colors cursor-pointer">
                <MessageCircle className="h-5 w-5 text-trading-primary" />
              </div>
              <div className="bg-trading-primary/10 p-2 rounded-lg hover:bg-trading-primary/20 transition-colors cursor-pointer">
                <Twitter className="h-5 w-5 text-trading-primary" />
              </div>
              <div className="bg-trading-primary/10 p-2 rounded-lg hover:bg-trading-primary/20 transition-colors cursor-pointer">
                <Youtube className="h-5 w-5 text-trading-primary" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-trading-primary transition-colors">Marketplace</a></li>
              <li><a href="#" className="hover:text-trading-primary transition-colors">My Trades</a></li>
              <li><a href="#" className="hover:text-trading-primary transition-colors">Sell Items</a></li>
              <li><a href="#" className="hover:text-trading-primary transition-colors">Trading History</a></li>
              <li><a href="#" className="hover:text-trading-primary transition-colors">Reputation</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-trading-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-trading-primary transition-colors">Trading Guides</a></li>
              <li><a href="#" className="hover:text-trading-primary transition-colors">Safety Tips</a></li>
              <li><a href="#" className="hover:text-trading-primary transition-colors">Report Scam</a></li>
              <li><a href="#" className="hover:text-trading-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-trading-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-trading-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-trading-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-trading-primary transition-colors">Refund Policy</a></li>
              <li><a href="#" className="hover:text-trading-primary transition-colors">DMCA</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-muted-foreground text-sm">
              © 2024 CrossTrade. All rights reserved. Not affiliated with Roblox Corporation.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-trading-primary" />
                <span className="text-sm text-muted-foreground">support@crosstrade.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;