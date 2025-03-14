
import { CheckCircle, ArrowRight, BarChart2, Search, Zap, FileText, BarChart, LineChart, TrendingUp, PieChart, Brain, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const FeaturesPage = () => {
  const features = [
    {
      title: 'AI Research Agents',
      description: 'Specialized autonomous agents that continuously analyze market data and documents to extract actionable insights.',
      icon: <Bot className="h-8 w-8 text-brand-blue" />,
      badge: 'Advanced'
    },
    {
      title: 'Real-Time Data Aggregation',
      description: 'Integration with CSE data, company websites, news feeds, and government sources.',
      icon: <LineChart className="h-8 w-8 text-brand-blue" />,
      badge: 'Core'
    },
    {
      title: 'Fundamental Analysis',
      description: 'Extracts key financial ratios, project updates, earnings data, and regulatory filings.',
      icon: <BarChart className="h-8 w-8 text-brand-blue" />,
      badge: 'AI-Powered'
    },
    {
      title: 'Technical Analysis',
      description: 'Processes historical price and volume data, calculating moving averages, RSI, MACD, and more.',
      icon: <TrendingUp className="h-8 w-8 text-brand-blue" />,
      badge: 'Advanced'
    },
    {
      title: 'News & Sentiment Analysis',
      description: 'Analyzes real-time news and social media for sentiment scoring and impact assessment.',
      icon: <FileText className="h-8 w-8 text-brand-blue" />,
      badge: 'AI-Powered'
    },
    {
      title: 'Document Summarization',
      description: 'Uses advanced NLP to provide concise summaries of lengthy financial and regulatory documents.',
      icon: <Brain className="h-8 w-8 text-brand-blue" />,
      badge: 'AI-Powered'
    },
    {
      title: 'Customizable Dashboard',
      description: 'Interactive charts, real-time alerts, and customizable views for tracking indices and stocks.',
      icon: <PieChart className="h-8 w-8 text-brand-blue" />,
      badge: 'Premium'
    }
  ];

  const tiers = [
    {
      name: 'Basic',
      price: '2,500',
      features: [
        'Real-time market data',
        'Basic technical analysis',
        'Limited news feed',
        'Daily market summary',
        'Standard charts and indicators',
        'Mobile app access'
      ]
    },
    {
      name: 'Professional',
      price: '6,999',
      features: [
        'Everything in Basic',
        'Advanced technical indicators',
        'Full AI sentiment analysis',
        'Document summarization',
        'Customizable dashboard',
        'Email alerts and notifications',
        'Historical data analysis'
      ],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: '14,999',
      features: [
        'Everything in Professional',
        'API access',
        'Custom report generation',
        'Multi-user access',
        'Dedicated support',
        'Custom integrations',
        'Private analyst insights'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">Powerful Features for Sri Lankan Investors</h1>
            <p className="text-xl text-muted-foreground">
              Discover how our platform brings together multi-domain insights and AI-powered research to transform your investment decisions.
            </p>
          </div>

          {/* AI Agents Feature Spotlight */}
          <div className="max-w-4xl mx-auto mb-16 glass-card rounded-2xl p-8 bg-gradient-to-r from-brand-blue/10 to-brand-light-blue/10 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3 flex-shrink-0">
                <div className="aspect-square rounded-2xl bg-brand-blue/20 flex items-center justify-center p-8">
                  <Bot className="w-24 h-24 text-brand-blue" />
                </div>
              </div>
              <div className="md:w-2/3">
                <Badge className="mb-3">Featured Technology</Badge>
                <h2 className="text-2xl md:text-3xl font-medium mb-4">AI Research & Document Analysis Agents</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Our platform leverages specialized autonomous AI agents that continuously gather, analyze, and interpret market data and financial documents.
                </p>
                <ul className="space-y-2 mb-6">
                  {['Reduces research time by 85%', 'Updates insights in real-time', 'Identifies patterns human analysts might miss', 'Summarizes lengthy documents in seconds'].map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Button className="bg-brand-blue hover:bg-brand-dark-blue">
                  Learn How It Works
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="glass-card rounded-2xl p-6 hover:shadow-card-hover transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-medium">{feature.title}</h3>
                  <Badge variant={feature.badge === 'AI-Powered' ? 'info' : 'default'}>
                    {feature.badge}
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <h2 className="text-3xl font-medium mb-6">Pricing</h2>
              <p className="text-xl text-muted-foreground">
                Choose the plan that fits your investment needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {tiers.map((tier, index) => (
                <div 
                  key={tier.name}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 animate-fade-in ${
                    tier.highlighted 
                      ? 'glass-card border-2 border-brand-blue shadow-glow scale-105 z-10' 
                      : 'glass-card'
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`p-6 ${tier.highlighted ? 'bg-brand-blue/5' : ''}`}>
                    <h3 className="text-xl font-medium">{tier.name}</h3>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-3xl font-bold">LKR {tier.price}</span>
                      <span className="ml-2 text-muted-foreground">/month</span>
                    </div>
                    
                    <ul className="mt-6 space-y-4">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex">
                          <CheckCircle className="h-5 w-5 text-brand-blue flex-shrink-0 mr-3" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full mt-8 ${
                        tier.highlighted 
                          ? 'bg-brand-blue hover:bg-brand-dark-blue' 
                          : 'bg-muted-foreground/20 text-foreground hover:bg-muted-foreground/30'
                      }`}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
              All plans include a 14-day free trial. No credit card required. 
              Enterprise plans with custom features are available for institutional investors.
            </p>
          </div>
        </section>
        
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto glass-card rounded-2xl p-10 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:w-3/5 mb-8 md:mb-0 md:pr-10">
                <h2 className="text-3xl font-medium mb-4">Ready to enhance your market intelligence?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Join investors across Sri Lanka who are transforming their approach with AI-powered insights.
                </p>
                <Button className="bg-brand-blue hover:bg-brand-dark-blue transition-all duration-300">
                  <span>Sign Up Now</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="md:w-2/5">
                <div className="aspect-square bg-gradient-to-br from-brand-blue/20 to-brand-light-blue/20 rounded-lg flex items-center justify-center">
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-brand-blue to-brand-light-blue flex items-center justify-center">
                    <span className="text-white font-bold text-3xl">CM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FeaturesPage;
