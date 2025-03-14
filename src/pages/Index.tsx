
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getMockStocks } from '@/utils/stockDataUtils';
import HeroSection from '@/components/home/HeroSection';
import DashboardPreview from '@/components/home/DashboardPreview';
import CallToAction from '@/components/home/CallToAction';

const Index = () => {
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);
  const mockStocks = getMockStocks();

  useEffect(() => {
    // Animate items sequentially
    const animationTimeout = setTimeout(() => {
      const items = [];
      for (let i = 0; i < 10; i++) {
        items.push(i);
        setAnimatedItems([...items]);
      }
    }, 200);

    return () => clearTimeout(animationTimeout);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <HeroSection />
        <DashboardPreview stocks={mockStocks} animatedItems={animatedItems} />
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
