import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TradingCategories from "@/components/TradingCategories";
import FeaturedTrades from "@/components/FeaturedTrades";
import SafetyFeatures from "@/components/SafetyFeatures";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TradingCategories />
      <FeaturedTrades />
      <SafetyFeatures />
      <Footer />
    </div>
  );
};

export default Index;
