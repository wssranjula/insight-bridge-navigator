
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
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
  );
};

export default CallToAction;
