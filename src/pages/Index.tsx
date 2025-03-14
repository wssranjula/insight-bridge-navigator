
import { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, BarChart, FileText, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/dashboard/SearchBar';
import MarketOverview from '@/components/dashboard/MarketOverview';
import StockCard from '@/components/dashboard/StockCard';
import NewsFeed from '@/components/dashboard/NewsFeed';
import SentimentAnalysis from '@/components/dashboard/SentimentAnalysis';
import { Link } from 'react-router-dom';

// Mock stock data for demonstration
const generateMockStockData = (
  symbol: string, 
  name: string, 
  price: number, 
  change: number, 
  volume: number, 
  pe: number,
  marketCap: number,
  dividend: number,
  sector: string
) => {
  // Generate mock chart data
  const data = [];
  const volatility = Math.random() * 2;
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const random = (Math.random() - 0.5) * volatility;
    const value = price - (i * change / 30) + random;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Number(value.toFixed(2))
    });
  }
  
  return {
    symbol,
    name,
    price,
    change,
    percentChange: (change / (price - change)) * 100,
    volume,
    pe,
    marketCap,
    dividend,
    sector,
    data
  };
};

const mockStocks = [
  generateMockStockData('JKH', 'John Keells Holdings PLC', 142.75, 3.25, 520000, 14.3, 18.9e9, 2.1, 'Diversified'),
  generateMockStockData('COMB', 'Commercial Bank of Ceylon PLC', 95.50, -1.75, 380000, 9.2, 10.5e9, 3.2, 'Banking'),
  generateMockStockData('DIAL', 'Dialog Axiata PLC', 18.60, 0.40, 1250000, 11.8, 15.2e9, 4.5, 'Telecommunications'),
  generateMockStockData('LOLC', 'LOLC Holdings PLC', 198.25, 5.50, 210000, 6.5, 9.4e9, 1.8, 'Financial Services'),
  generateMockStockData('HAYL', 'Hayleys PLC', 78.30, -2.10, 180000, 12.3, 5.9e9, 2.3, 'Manufacturing'),
  generateMockStockData('CTC', 'Ceylon Tobacco Company PLC', 950.75, 15.25, 65000, 8.6, 17.8e9, 5.4, 'Consumer Goods')
];

const Index = () => {
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);
  const [visibleStocks, setVisibleStocks] = useState(4);

  useEffect(() => {
    // Animate items sequentially
    const animationTimeout = setTimeout(() => {
      const items = [];
      for (let i = 0; i < 8; i++) {
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
        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-10 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="animate-fade-in">AI-Powered Market Intelligence</Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-tight animate-fade-in animate-delay-100">
                Make smarter investments in the Colombo Stock Exchange
              </h1>
              <p className="text-xl text-muted-foreground animate-fade-in animate-delay-200">
                Colombo Market Navigator combines real-time data, advanced analytics, and AI insights to help you navigate the Sri Lankan stock market with confidence.
              </p>
              <div className="flex flex-wrap gap-4 pt-4 animate-fade-in animate-delay-300">
                <Button className="bg-brand-blue hover:bg-brand-dark-blue transition-all duration-300 text-lg px-8 py-6 h-auto">
                  <span>Get Started</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="text-lg px-8 py-6 h-auto border-2">
                  Explore Features
                </Button>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6 lg:p-10 animate-fade-in animate-delay-400">
              <MarketOverview />
            </div>
          </div>
        </section>
        
        {/* Dashboard Preview Section */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge variant="outline" className="animate-fade-in">Dashboard Preview</Badge>
              <h2 className="text-3xl sm:text-4xl font-medium mt-4 mb-6 animate-fade-in animate-delay-100">
                Comprehensive market intelligence at your fingertips
              </h2>
              <p className="text-xl text-muted-foreground animate-fade-in animate-delay-200">
                Experience a powerful dashboard that brings together technical, fundamental, and sentiment analysis in one place.
              </p>
            </div>
            
            <div className="mb-8 max-w-3xl mx-auto animate-fade-in animate-delay-300">
              <SearchBar />
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className={`md:col-span-2 ${animatedItems.includes(0) ? 'animate-slide-up' : 'opacity-0'}`}>
                <MarketOverview />
              </div>
              <div className={animatedItems.includes(1) ? 'animate-slide-up animate-delay-100' : 'opacity-0'}>
                <SentimentAnalysis />
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-medium mb-6 flex items-center justify-between">
                <span>Top Performing Stocks</span>
                <Button variant="ghost" size="sm" className="text-sm">
                  View All
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockStocks.slice(0, visibleStocks).map((stock, index) => (
                  <div 
                    key={stock.symbol}
                    className={animatedItems.includes(index + 2) ? `animate-slide-up animate-delay-${(index + 2) * 100}` : 'opacity-0'}
                  >
                    <StockCard stock={stock} />
                  </div>
                ))}
              </div>
              
              {visibleStocks < mockStocks.length && (
                <div className="flex justify-center mt-8">
                  <Button 
                    variant="outline"
                    onClick={() => setVisibleStocks(mockStocks.length)}
                  >
                    Show More Stocks
                  </Button>
                </div>
              )}
            </div>
            
            <div className="mt-10 grid md:grid-cols-3 gap-8">
              <div className={`md:col-span-2 ${animatedItems.includes(6) ? 'animate-slide-up animate-delay-500' : 'opacity-0'}`}>
                <NewsFeed />
              </div>
              <div className={animatedItems.includes(7) ? 'animate-slide-up animate-delay-600' : 'opacity-0'}>
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-xl font-medium mb-6">Quick Access</h3>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start text-left">
                      <TrendingUp className="mr-2 h-5 w-5 text-brand-blue" />
                      <span>Technical Analysis</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <BarChart className="mr-2 h-5 w-5 text-brand-blue" />
                      <span>Fundamental Analysis</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <FileText className="mr-2 h-5 w-5 text-brand-blue" />
                      <span>Document Summarization</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto glass-card rounded-2xl p-10 bg-gradient-to-r from-brand-blue/5 to-brand-light-blue/5">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-medium mb-4">Ready to transform your investment approach?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join investors across Sri Lanka who are leveraging AI-powered insights for better investment decisions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-brand-blue hover:bg-brand-dark-blue transition-all duration-300 text-lg px-8 py-6 h-auto">
                  <span>Get Started</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/features">
                  <Button variant="outline" className="text-lg px-8 py-6 h-auto border-2">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
