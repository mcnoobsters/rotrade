import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TradingCategories from "@/components/TradingCategories";
import FeaturedTrades from "@/components/FeaturedTrades";
import SafetyFeatures from "@/components/SafetyFeatures";
import TradingGuides from "@/components/TradingGuides";
import Support from "@/components/Support";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TradingCategories />
      <FeaturedTrades />
      <SafetyFeatures />
      <TradingGuides />
      <Support />
      <Footer />
    </div>
  );
};

export default Index;
