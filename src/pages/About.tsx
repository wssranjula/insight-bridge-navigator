
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">About Colombo Market Navigator</h1>
            <p className="text-xl text-muted-foreground">
              An integrated, AI-powered market intelligence platform tailored specifically for the Colombo Stock Exchange.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-slide-up">
                <h2 className="text-2xl font-medium">Our Vision</h2>
                <p className="text-muted-foreground">
                  Colombo Market Navigator is envisioned as an integrated, AI-powered market intelligence platform tailored specifically for the Colombo Stock Exchange (CSE). Our goal is to empower individual investors, institutional players, and financial advisors with real‑time, multi-domain insights.
                </p>
                <p className="text-muted-foreground">
                  We combine diverse data sources with advanced AI analytics. Our platform mirrors the comprehensive approach of systems like the Bloomberg Terminal but is localized for the Colombo market, offering both deep analysis and affordability.
                </p>
              </div>
              <div className="glass-card rounded-2xl p-6 animate-fade-in animate-delay-200">
                <div className="aspect-video bg-gradient-to-br from-brand-blue/20 to-brand-light-blue/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-brand-blue to-brand-light-blue flex items-center justify-center mx-auto">
                      <span className="text-white font-bold text-2xl">CM</span>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">Vision Concept</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="glass-card rounded-2xl p-6 order-2 md:order-1 animate-fade-in animate-delay-200">
                <div className="aspect-video bg-gradient-to-br from-brand-blue/20 to-brand-light-blue/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-brand-blue to-brand-light-blue flex items-center justify-center mx-auto">
                      <span className="text-white font-bold text-2xl">CM</span>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">Target Audience</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6 order-1 md:order-2 animate-slide-up animate-delay-100">
                <h2 className="text-2xl font-medium">Target Audience</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Retail and high-net-worth investors seeking data-driven market insights</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Asset management firms and hedge funds focusing on Sri Lankan equities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Financial advisors and research analysts requiring comprehensive market data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Academics and market enthusiasts interested in local market dynamics</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-8 animate-fade-in">
              <h2 className="text-2xl font-medium mb-6">Our Approach</h2>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-brand-blue flex items-center justify-center text-white font-bold text-xl">
                    1
                  </div>
                  <h3 className="text-xl font-medium">Data Integration</h3>
                  <p className="text-muted-foreground">
                    We aggregate data from multiple sources including CSE data, company reports, news, and macroeconomic indicators.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-brand-blue flex items-center justify-center text-white font-bold text-xl">
                    2
                  </div>
                  <h3 className="text-xl font-medium">AI Analysis</h3>
                  <p className="text-muted-foreground">
                    Our advanced AI models analyze this data to provide insights across fundamental, technical, and sentiment dimensions.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-brand-blue flex items-center justify-center text-white font-bold text-xl">
                    3
                  </div>
                  <h3 className="text-xl font-medium">Actionable Insights</h3>
                  <p className="text-muted-foreground">
                    We deliver personalized, actionable intelligence to help users make informed investment decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-medium mb-6">Ready to transform your investment approach?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join us on this journey to bring sophisticated market intelligence to the Colombo Stock Exchange.
              </p>
              <Button className="bg-brand-blue hover:bg-brand-dark-blue transition-all duration-300 text-lg px-8 py-6 h-auto">
                <span>Get Started</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
