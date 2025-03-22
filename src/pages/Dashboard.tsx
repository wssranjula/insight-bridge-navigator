import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  FileSearch, 
  BarChart3, 
  TrendingUp, 
  FileText, 
  ChevronDown, 
  ArrowRight, 
  Layout, 
  UserCircle, 
  Shield, 
  Sparkles,
  Brain,
  Lightbulb,
  Search,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/dashboard/SearchBar';
import MarketOverview from '@/components/dashboard/MarketOverview';
import StockCard from '@/components/dashboard/StockCard';
import NewsFeed from '@/components/dashboard/NewsFeed';
import SentimentAnalysis from '@/components/dashboard/SentimentAnalysis';

// Mock stock data
const generateMockStockData = (
  symbol, 
  name, 
  price, 
  change, 
  volume, 
  pe,
  marketCap,
  dividend,
  sector
) => {
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

// AI Agents Data
const aiAgents = [
  {
    id: 'market-analyst',
    name: 'Market Analyst',
    icon: <BarChart3 className="h-6 w-6" />,
    description: 'Advanced AI that analyzes market trends, patterns, and anomalies to identify potential investment opportunities.',
    capabilities: [
      'Pattern recognition in price movements',
      'Volume analysis and liquidity assessment',
      'Correlation analysis between sectors',
      'Market breadth evaluation'
    ],
    color: 'from-violet-500 to-purple-700',
    completion: 92,
  },
  {
    id: 'document-analyst',
    name: 'Document Analyst',
    icon: <FileSearch className="h-6 w-6" />,
    description: 'Processes and extracts insights from financial reports, regulatory filings, and corporate announcements.',
    capabilities: [
      'Annual report summarization',
      'Financial statement analysis',
      'Regulatory filing assessment',
      'Corporate announcement interpretation'
    ],
    color: 'from-blue-500 to-cyan-500',
    completion: 85,
  },
  {
    id: 'sentiment-tracker',
    name: 'Sentiment Tracker',
    icon: <Lightbulb className="h-6 w-6" />,
    description: 'Monitors news, social media, and analyst reports to gauge market sentiment on specific stocks or sectors.',
    capabilities: [
      'News sentiment analysis',
      'Social media trend tracking',
      'Analyst rating aggregation',
      'Sentiment change alerts'
    ],
    color: 'from-amber-400 to-orange-600',
    completion: 78,
  },
  {
    id: 'risk-advisor',
    name: 'Risk Advisor',
    icon: <Shield className="h-6 w-6" />,
    description: 'Evaluates potential risks in your portfolio and suggests risk mitigation strategies based on market conditions.',
    capabilities: [
      'Portfolio risk assessment',
      'Volatility forecasting',
      'Diversification recommendations',
      'Hedging strategy suggestions'
    ],
    color: 'from-red-500 to-pink-600',
    completion: 88,
  },
];

// Recent insights from AI agents
const recentInsights = [
  {
    id: 1,
    agent: 'Market Analyst',
    content: 'Banking sector showing unusual volume patterns over the last 5 trading sessions. Potential upcoming movement detected in COMB, HNB, and SAMP.',
    timestamp: '2 hours ago',
    icon: <BarChart3 className="h-5 w-5 text-violet-500" />,
  },
  {
    id: 2,
    agent: 'Document Analyst',
    content: 'Q2 Financial Report for JKH indicates 12% YoY growth in their leisure segment, exceeding analyst expectations. Management guidance remains cautiously optimistic.',
    timestamp: '5 hours ago',
    icon: <FileSearch className="h-5 w-5 text-blue-500" />,
  },
  {
    id: 3,
    agent: 'Sentiment Tracker',
    content: 'Detected significant positive sentiment shift for Dialog Axiata (DIAL) following their infrastructure expansion announcement. Social media mentions up 215%.',
    timestamp: '1 day ago',
    icon: <Lightbulb className="h-5 w-5 text-amber-500" />,
  },
  {
    id: 4,
    agent: 'Risk Advisor',
    content: 'Current portfolio exposure to manufacturing sector (32%) exceeds recommended allocation. Consider rebalancing to reduce concentration risk.',
    timestamp: '1 day ago',
    icon: <Shield className="h-5 w-5 text-red-500" />,
  },
];

const FuturisticDashboard = () => {
  const [animatedItems, setAnimatedItems] = useState([]);
  const [visibleStocks, setVisibleStocks] = useState(4);
  const [activeAgent, setActiveAgent] = useState('market-analyst');
  const [isWorking, setIsWorking] = useState(false);

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

  const triggerAgentWork = () => {
    setIsWorking(true);
    setTimeout(() => {
      setIsWorking(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/90">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        {/* Dashboard Header with Glassmorphic Effect */}
        <section className="container mx-auto px-6 pt-4 pb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-medium mb-2 flex items-center">
                <Layers className="mr-2 h-6 w-6 text-brand-blue" />
                Market Intelligence Hub
                <Badge variant="outline" className="ml-3 bg-brand-blue/10 text-brand-blue">BETA</Badge>
              </h1>
              <p className="text-muted-foreground">
                Friday, March 14, 2025 • Market is <span className="text-market-up font-medium">Open</span> • Last update: 2 minutes ago
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <UserCircle className="h-4 w-4" />
                <span>My Portfolio</span>
              </Button>
              <Button className="bg-brand-blue hover:bg-brand-dark-blue gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Pro Features</span>
              </Button>
            </div>
          </div>
          
          <div className="w-full max-w-3xl mb-8">
            <SearchBar 
              placeholder="Search for stocks, sectors, or ask a question..."
              className="bg-black/5 dark:bg-white/5 backdrop-blur-xl border-none shadow-lg"
            />
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass-card rounded-xl p-4 animate-fade-in border border-border/40">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">CSE All Share</p>
                  <p className="text-2xl font-medium mt-1">12,735.82</p>
                </div>
                <Badge variant="positive" className="flex items-center">
                  +0.99%
                </Badge>
              </div>
            </div>
            <div className="glass-card rounded-xl p-4 animate-fade-in animate-delay-100 border border-border/40">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">S&P SL20</p>
                  <p className="text-2xl font-medium mt-1">4,352.16</p>
                </div>
                <Badge variant="negative" className="flex items-center">
                  -0.54%
                </Badge>
              </div>
            </div>
            <div className="glass-card rounded-xl p-4 animate-fade-in animate-delay-200 border border-border/40">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Market Cap</p>
                  <p className="text-2xl font-medium mt-1">LKR 4.2T</p>
                </div>
                <Badge variant="neutral" className="flex items-center">
                  +0.2%
                </Badge>
              </div>
            </div>
            <div className="glass-card rounded-xl p-4 animate-fade-in animate-delay-300 border border-border/40">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Volume</p>
                  <p className="text-2xl font-medium mt-1">42.3M</p>
                </div>
                <Badge variant="positive" className="flex items-center">
                  +18.5%
                </Badge>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Dashboard */}
        <section className="container mx-auto px-6 mb-10">
          <Tabs defaultValue="market" className="w-full">
            <TabsList className="w-full bg-black/5 dark:bg-white/5 p-1 rounded-xl mb-6">
              <TabsTrigger value="market" className="text-base py-2 rounded-lg data-[state=active]:bg-brand-blue data-[state=active]:text-white">
                <BarChart3 className="h-4 w-4 mr-2" />
                Market Overview
              </TabsTrigger>
              <TabsTrigger value="ai-agents" className="text-base py-2 rounded-lg data-[state=active]:bg-brand-blue data-[state=active]:text-white">
                <Brain className="h-4 w-4 mr-2" />
                AI Agents
              </TabsTrigger>
              <TabsTrigger value="watchlist" className="text-base py-2 rounded-lg data-[state=active]:bg-brand-blue data-[state=active]:text-white">
                <TrendingUp className="h-4 w-4 mr-2" />
                My Watchlist
              </TabsTrigger>
              <TabsTrigger value="news" className="text-base py-2 rounded-lg data-[state=active]:bg-brand-blue data-[state=active]:text-white">
                <FileText className="h-4 w-4 mr-2" />
                News & Analysis
              </TabsTrigger>
            </TabsList>
            
            {/* Market Overview Tab */}
            <TabsContent value="market" className="space-y-8 mt-2">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <MarketOverview />
                </div>
                <div>
                  <SentimentAnalysis />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-6 flex items-center justify-between">
                  <span>Top Performing Stocks</span>
                  <Button variant="ghost" size="sm" className="text-sm">
                    View All
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {mockStocks.slice(0, visibleStocks).map((stock, index) => (
                    <StockCard key={stock.symbol} stock={stock} />
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
              
              <div>
                <NewsFeed />
              </div>
            </TabsContent>
            
            {/* AI Agents Tab */}
            <TabsContent value="ai-agents" className="mt-2">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* AI Agents Selection Panel */}
                <div className="lg:col-span-1 space-y-5">
                  <div className="glass-card rounded-xl p-6 border border-border/40">
                    <h3 className="text-xl font-medium mb-4 flex items-center">
                      <Bot className="mr-2 h-5 w-5 text-brand-blue" />
                      AI Assistant Agents
                    </h3>
                    
                    <div className="space-y-3">
                      {aiAgents.map((agent) => (
                        <div 
                          key={agent.id}
                          className={`
                            p-3 rounded-lg border border-border/40 transition-all cursor-pointer
                            hover:bg-black/5 dark:hover:bg-white/5
                            ${activeAgent === agent.id ? 'bg-black/5 dark:bg-white/5 border-brand-blue/60' : ''}
                          `}
                          onClick={() => setActiveAgent(agent.id)}
                        >
                          <div className="flex items-center">
                            <div className={`rounded-lg p-2 bg-gradient-to-r ${agent.color} text-white mr-3`}>
                              {agent.icon}
                            </div>
                            <div>
                              <h4 className="font-medium">{agent.name}</h4>
                              <div className="mt-1">
                                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                  <span>Training completion</span>
                                  <span>{agent.completion}%</span>
                                </div>
                                <Progress value={agent.completion} className="h-1.5" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <Button 
                        className="w-full bg-gradient-to-r from-brand-blue to-brand-light-blue hover:from-brand-blue/90 hover:to-brand-light-blue/90 transition-all"
                        onClick={triggerAgentWork}
                        disabled={isWorking}
                      >
                        {isWorking ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-opacity-50 border-t-white rounded-full mr-2"></div>
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <Brain className="mr-2 h-4 w-4" />
                            <span>Run AI Analysis</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="glass-card rounded-xl p-6 border border-border/40">
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
                      Recent Insights
                    </h3>
                    
                    <div className="space-y-4">
                      {recentInsights.map((insight) => (
                        <div key={insight.id} className="border-b border-border/40 pb-4 last:border-0 last:pb-0">
                          <div className="flex items-start gap-3">
                            <div className="mt-1">{insight.icon}</div>
                            <div>
                              <div className="flex items-center">
                                <h5 className="font-medium text-sm">{insight.agent}</h5>
                                <span className="text-xs text-muted-foreground ml-auto">{insight.timestamp}</span>
                              </div>
                              <p className="text-sm mt-1 text-muted-foreground">{insight.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* AI Agent Detail Panel */}
                <div className="lg:col-span-2 space-y-6">
                  {aiAgents.filter(agent => agent.id === activeAgent).map((agent) => (
                    <div key={agent.id} className="space-y-6">
                      <div className="glass-card rounded-xl p-6 border border-border/40">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <div className={`rounded-lg p-3 bg-gradient-to-r ${agent.color} text-white mr-4`}>
                              {agent.icon}
                            </div>
                            <div>
                              <h3 className="text-2xl font-medium">{agent.name}</h3>
                              <p className="text-muted-foreground mt-1">AI-powered market intelligence agent</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-brand-blue/10 text-brand-blue">v2.5</Badge>
                        </div>
                        
                        <div className="mt-6">
                          <h4 className="font-medium mb-2">Description</h4>
                          <p className="text-muted-foreground">{agent.description}</p>
                        </div>
                        
                        <div className="mt-6">
                          <h4 className="font-medium mb-3">Capabilities</h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            {agent.capabilities.map((capability, idx) => (
                              <div key={idx} className="flex items-center border border-border/40 rounded-lg p-3 bg-black/5 dark:bg-white/5">
                                <div className="h-2 w-2 rounded-full bg-brand-blue mr-2"></div>
                                <span className="text-sm">{capability}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Contextual Interface Based on Agent Type */}
                      {agent.id === 'market-analyst' && (
                        <div className="glass-card rounded-xl p-6 border border-border/40">
                          <h4 className="text-lg font-medium mb-4">Market Analysis Interface</h4>
                          <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="border border-border/40 rounded-lg p-4">
                                <h5 className="text-sm font-medium mb-2">Select Analysis Type</h5>
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Technical</Badge>
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Fundamental</Badge>
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Volume</Badge>
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Correlation</Badge>
                                </div>
                              </div>
                              <div className="border border-border/40 rounded-lg p-4">
                                <h5 className="text-sm font-medium mb-2">Time Frame</h5>
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Daily</Badge>
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Weekly</Badge>
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Monthly</Badge>
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Quarterly</Badge>
                                </div>
                              </div>
                            </div>
                            <div className="border border-border/40 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="text-sm font-medium">Ticker or Sector to Analyze</h5>
                                <Button variant="ghost" size="sm" className="h-7 text-xs">
                                  <Search className="h-3 w-3 mr-1" />
                                  Browse
                                </Button>
                              </div>
                              <input
                                type="text"
                                placeholder="Enter ticker (e.g., JKH) or sector (e.g., Banking)"
                                className="w-full p-2 rounded-md border border-input bg-background"
                              />
                            </div>
                            <Button className="w-full bg-gradient-to-r from-violet-500 to-purple-700 hover:from-violet-600 hover:to-purple-800">
                              <BarChart3 className="mr-2 h-4 w-4" />
                              Generate Market Analysis
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {agent.id === 'document-analyst' && (
                        <div className="glass-card rounded-xl p-6 border border-border/40">
                          <h4 className="text-lg font-medium mb-4">Document Analysis Interface</h4>
                          <div className="space-y-4">
                            <div className="border border-border/40 rounded-lg p-6 border-dashed flex flex-col items-center justify-center">
                              <FileSearch className="h-12 w-12 text-muted-foreground mb-3" />
                              <p className="text-center text-muted-foreground mb-2">Drag and drop financial documents here or</p>
                              <Button size="sm">Browse Files</Button>
                              <p className="text-xs text-muted-foreground mt-3">Supports PDF, DOCX, XLSX, CSV (Max 50MB)</p>
                            </div>
                            <div className="border border-border/40 rounded-lg p-4">
                              <h5 className="text-sm font-medium mb-2">Analysis Focus</h5>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Financial Metrics</Badge>
                                <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Risk Factors</Badge>
                                <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Growth Projections</Badge>
                                <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Management Comments</Badge>
                              </div>
                            </div>
                            <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                              <FileSearch className="mr-2 h-4 w-4" />
                              Analyze Document
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {agent.id === 'sentiment-tracker' && (
                        <div className="glass-card rounded-xl p-6 border border-border/40">
                          <h4 className="text-lg font-medium mb-4">Sentiment Analysis Interface</h4>
                          <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="border border-border/40 rounded-lg p-4">
                                <h5 className="text-sm font-medium mb-2">Analysis Scope</h5>
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">News Articles</Badge>
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Social Media</Badge>
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Analyst Reports</Badge>
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Forums</Badge>
                                </div>
                              </div>
                              <div className="border border-border/40 rounded-lg p-4">
                                <h5 className="text-sm font-medium mb-2">Time Period</h5>
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Last 24h</Badge>
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Last Week</Badge>
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Last Month</Badge>
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Custom</Badge>
                                </div>
                              </div>
                            </div>
                            <div className="border border-border/40 rounded-lg p-4">
                              <h5 className="text-sm font-medium mb-2">Stock or Sector</h5>
                              <input
                                type="text"
                                placeholder="Enter stock symbol or sector name"
                                className="w-full p-2 rounded-md border border-input bg-background"
                              />
                            </div>
                            <Button className="w-full bg-gradient-to-r from-amber-400 to-orange-600 hover:from-amber-500 hover:to-orange-700">
                              <Lightbulb className="mr-2 h-4 w-4" />
                              Analyze Sentiment
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {agent.id === 'risk-advisor' && (
                        <div className="glass-card rounded-xl p-6 border border-border/40">
                          <h4 className="text-lg font-medium mb-4">Risk Assessment Interface</h4>
                          <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="border border-border/40 rounded-lg p-4">
                                <h5 className="text-sm font-medium mb-2">Risk Type</h5>
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Market Risk</Badge>
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Volatility</Badge>
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Concentration</Badge>
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Liquidity</Badge>
                                </div>
                              </div>
                              <div className="border border-border/40 rounded-lg p-4">
                                <h5 className="text-sm font-medium mb-2">Analysis Depth</h5>
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Basic</Badge>
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Standard</Badge>
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Advanced</Badge>
                                  <Badge variant="outline" className="cursor-pointer hover:bg-brand-blue/10 hover:border-brand-blue">Expert</Badge>
                                </div>
                              </div>
                            </div>
                            <div className="border border-border/40 rounded-lg p-4">
                              <h5 className="text-sm font-medium mb-2">Portfolio Upload</h5>
                              <div className="flex items-center justify-between">
                                <input
                                  type="text"
                                  placeholder="Upload portfolio or connect to broker"
                                  className="w-full p-2 rounded-md border border-input bg-background mr-2"
                                />
                                <Button variant="outline" size="sm">
                                  Import
                                </Button>
                              </div>
                            </div>
                            <Button className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700">
                              <Shield className="mr-2 h-4 w-4" />
                              Assess Portfolio Risk
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Watchlist Tab */}
            <TabsContent value="watchlist" className="mt-2">
              <div className="glass-card rounded-xl p-6 border border-border/40 text-center py-20">
                <TrendingUp className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-medium mb-2">My Watchlist Feature Coming Soon</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Create custom watchlists, set price alerts, and track your favorite stocks all in one place.
                </p>
              </div>
            </TabsContent>
            
            {/* News Tab */}
            <TabsContent value="news" className="mt-2">
              <NewsFeed />
            </TabsContent>
          </Tabs>
        </section>
        
        {/* AI Agents Showcase Section */}
        <section className="container mx-auto px-6 py-12 mb-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge variant="outline" className="bg-brand-blue/10 text-brand-blue mb-4">NEW FEATURE</Badge>
            <h2 className="text-3xl font-medium mb-4">AI Agents for Market Intelligence</h2>
            <p className="text-lg text-muted-foreground">
              Our specialized AI agents work 24/7 to analyze market data, process documents,
              and generate actionable insights tailored to your investment strategy.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiAgents.map((agent) => (
              <div key={agent.id} className="glass-card rounded-xl p-6 border border-border/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className={`rounded-lg p-3 bg-gradient-to-r ${agent.color} text-white inline-flex mb-4`}>
                  {agent.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{agent.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{agent.description}</p>
                
                <div className="space-y-2 mb-4">
                  {agent.capabilities.slice(0, 2).map((capability, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-blue mr-2"></div>
                      <span>{capability}</span>
                    </div>
                  ))}
                  {agent.capabilities.length > 2 && (
                    <div className="text-sm text-brand-blue cursor-pointer hover:underline">
                      +{agent.capabilities.length - 2} more capabilities
                    </div>
                  )}
                </div>
                
                <div className="mt-auto pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Try This Agent
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 max-w-3xl mx-auto glass-card rounded-xl p-8 border border-border/40 bg-gradient-to-r from-brand-blue/5 to-brand-light-blue/5">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="md:flex-1">
                <Badge variant="outline" className="bg-brand-blue/10 text-brand-blue mb-2">BETA ACCESS</Badge>
                <h3 className="text-2xl font-medium mb-2">Create Your Own AI Agent</h3>
                <p className="text-muted-foreground mb-4">
                  Build a custom AI agent trained on your specific investment strategy, risk tolerance, and market preferences.
                </p>
                <Button className="bg-gradient-to-r from-brand-blue to-brand-light-blue hover:from-brand-blue/90 hover:to-brand-light-blue/90">
                  <Brain className="mr-2 h-4 w-4" />
                  Get Started
                </Button>
              </div>
              <div className="md:flex-1 flex justify-center">
                <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-brand-blue to-brand-light-blue flex items-center justify-center">
                  <Bot className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="bg-muted/30 py-16 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto glass-card rounded-xl p-8 border border-border/40 bg-gradient-to-r from-brand-blue/10 to-brand-light-blue/10 shadow-glow">
              <div className="text-center">
                <Badge variant="outline" className="bg-brand-blue/10 text-brand-blue mb-4">PREMIUM ACCESS</Badge>
                <h2 className="text-3xl font-medium mb-4">Ready to transform your investment approach?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join investors across Sri Lanka who are leveraging AI-powered market intelligence for better investment decisions.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="bg-gradient-to-r from-brand-blue to-brand-light-blue hover:from-brand-blue/90 hover:to-brand-light-blue/90 text-lg px-8 py-6 h-auto">
                    <span>Get Started</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" className="text-lg px-8 py-6 h-auto">
                    View Pricing
                  </Button>
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

export default FuturisticDashboard;