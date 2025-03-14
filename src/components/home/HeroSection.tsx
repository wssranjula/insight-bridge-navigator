
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MarketOverview from '@/components/dashboard/MarketOverview';

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;
