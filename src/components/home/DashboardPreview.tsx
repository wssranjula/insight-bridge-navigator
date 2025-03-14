
import React, { useState } from 'react';
import { ChevronDown, Bot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/dashboard/SearchBar';
import MarketOverview from '@/components/dashboard/MarketOverview';
import StockCard from '@/components/dashboard/StockCard';
import NewsFeed from '@/components/dashboard/NewsFeed';
import SentimentAnalysis from '@/components/dashboard/SentimentAnalysis';
import AIAgents from '@/components/dashboard/AIAgents';

// Props interface for stock data
interface DashboardPreviewProps {
  stocks: any[];
  animatedItems: number[];
}

const DashboardPreview = ({ stocks, animatedItems }: DashboardPreviewProps) => {
  const [visibleStocks, setVisibleStocks] = useState(4);

  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="animate-fade-in">Dashboard Preview</Badge>
          <h2 className="text-3xl sm:text-4xl font-medium mt-4 mb-6 animate-fade-in animate-delay-100">
            Comprehensive market intelligence at your fingertips
          </h2>
          <p className="text-xl text-muted-foreground animate-fade-in animate-delay-200">
            Experience a powerful dashboard that brings together technical, fundamental, and AI-powered sentiment analysis in one place.
          </p>
        </div>
        
        <div className="mb-8 max-w-3xl mx-auto animate-fade-in animate-delay-300">
          <SearchBar />
        </div>
        
        {/* AI Agents Feature Highlight */}
        <div className="glass-card rounded-2xl p-6 md:p-8 mb-10 bg-gradient-to-r from-brand-blue/10 to-brand-light-blue/10 animate-fade-in animate-delay-100">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-16 flex-shrink-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-lg bg-brand-blue/20 flex items-center justify-center">
                <Bot className="h-6 w-6 text-brand-blue" />
              </div>
            </div>
            <div className="flex-grow text-center md:text-left">
              <Badge variant="outline" className="mb-2">New Feature</Badge>
              <h3 className="text-xl font-medium mb-2">Advanced AI Research Agents</h3>
              <p className="text-muted-foreground">
                Our platform leverages specialized AI agents for market research and document analysis, providing you with deeper insights and saving you hours of research time.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button className="bg-brand-blue hover:bg-brand-dark-blue">
                Learn More
              </Button>
            </div>
          </div>
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
            {stocks.slice(0, visibleStocks).map((stock, index) => (
              <div 
                key={stock.symbol}
                className={animatedItems.includes(index + 2) ? `animate-slide-up animate-delay-${(index + 2) * 100}` : 'opacity-0'}
              >
                <StockCard stock={stock} />
              </div>
            ))}
          </div>
          
          {visibleStocks < stocks.length && (
            <div className="flex justify-center mt-8">
              <Button 
                variant="outline"
                onClick={() => setVisibleStocks(stocks.length)}
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
            <AIAgents />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
