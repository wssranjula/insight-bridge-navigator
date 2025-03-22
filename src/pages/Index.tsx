import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  TrendingUp,
  Brain,
  FileSearch,
  Lightbulb,
  Shield,
  BarChart3,
  ChevronDown,
  Bot,
  Zap,
  MessageSquare,
  BarChart,
  FileText,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/dashboard/SearchBar";
import MarketOverview from "@/components/dashboard/MarketOverview";
import StockCard from "@/components/dashboard/StockCard";
import NewsFeed from "@/components/dashboard/NewsFeed";
import SentimentAnalysis from "@/components/dashboard/SentimentAnalysis";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// AI Agents Data
const aiAgents = [
  {
    id: "market-analyst",
    name: "Market Analyst",
    icon: <BarChart3 className="h-10 w-10" />,
    description:
      "Analyzes market trends and patterns to identify potential investment opportunities",
    capabilities: [
      "Pattern recognition in price movements",
      "Volume analysis and liquidity assessment",
      "Correlation analysis between sectors",
      "Market breadth evaluation",
    ],
    color: "from-violet-500 to-purple-700",
    stats: { accuracy: 92, speed: "3.5s" },
  },
  {
    id: "document-analyst",
    name: "Document Analyst",
    icon: <FileSearch className="h-10 w-10" />,
    description:
      "Extracts key insights from financial reports, regulatory filings, and announcements",
    capabilities: [
      "Annual report summarization",
      "Financial statement analysis",
      "Regulatory filing assessment",
      "Corporate announcement interpretation",
    ],
    color: "from-blue-500 to-cyan-500",
    stats: { accuracy: 85, speed: "5.2s" },
  },
  {
    id: "sentiment-tracker",
    name: "Sentiment Tracker",
    icon: <Lightbulb className="h-10 w-10" />,
    description:
      "Monitors news, social media, and analyst reports to gauge market sentiment",
    capabilities: [
      "News sentiment analysis",
      "Social media trend tracking",
      "Analyst rating aggregation",
      "Sentiment change alerts",
    ],
    color: "from-amber-400 to-orange-600",
    stats: { accuracy: 78, speed: "2.8s" },
  },
  {
    id: "risk-advisor",
    name: "Risk Advisor",
    icon: <Shield className="h-10 w-10" />,
    description:
      "Evaluates portfolio risks and suggests mitigation strategies based on market conditions",
    capabilities: [
      "Portfolio risk assessment",
      "Volatility forecasting",
      "Diversification recommendations",
      "Hedging strategy suggestions",
    ],
    color: "from-red-500 to-pink-600",
    stats: { accuracy: 88, speed: "4.1s" },
  },
];

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
    const value = price - (i * change) / 30 + random;

    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      value: Number(value.toFixed(2)),
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
    data,
  };
};

const mockStocks = [
  generateMockStockData(
    "JKH",
    "John Keells Holdings PLC",
    142.75,
    3.25,
    520000,
    14.3,
    18.9e9,
    2.1,
    "Diversified"
  ),
  generateMockStockData(
    "COMB",
    "Commercial Bank of Ceylon PLC",
    95.5,
    -1.75,
    380000,
    9.2,
    10.5e9,
    3.2,
    "Banking"
  ),
  generateMockStockData(
    "DIAL",
    "Dialog Axiata PLC",
    18.6,
    0.4,
    1250000,
    11.8,
    15.2e9,
    4.5,
    "Telecommunications"
  ),
  generateMockStockData(
    "LOLC",
    "LOLC Holdings PLC",
    198.25,
    5.5,
    210000,
    6.5,
    9.4e9,
    1.8,
    "Financial Services"
  ),
];

// AI agent insights
const agentInsights = [
  {
    agentId: "market-analyst",
    content:
      "Banking sector showing unusual volume patterns. Potential upcoming movement in COMB, HNB, and SAMP.",
  },
  {
    agentId: "document-analyst",
    content:
      "Q2 Financial Report for JKH indicates 12% YoY growth in leisure segment, exceeding analyst expectations.",
  },
  {
    agentId: "sentiment-tracker",
    content:
      "Positive sentiment detected for DIAL following infrastructure expansion announcement. Social media mentions up 215%.",
  },
  {
    agentId: "risk-advisor",
    content:
      "Current exposure to manufacturing sector (32%) exceeds recommended allocation. Consider rebalancing.",
  },
];

const EnhancedLandingPage = () => {
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);
  const [visibleStocks, setVisibleStocks] = useState(4);
  const [activeAgentTab, setActiveAgentTab] = useState("market-analyst");

  useEffect(() => {
    // Animate items sequentially
    const animationTimeout = setTimeout(() => {
      const items = [];
      for (let i = 0; i < 12; i++) {
        items.push(i);
        setAnimatedItems([...items]);
      }
    }, 200);

    return () => clearTimeout(animationTimeout);
  }, []);

  // Simulated typing effect for the hero headline
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Make smarter decisions with AI-powered market intelligence";

  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
      }, 50);

      return () => clearTimeout(typingTimeout);
    }
  }, [displayedText, fullText]);

  const getAgentById = (id: string) => {
    return aiAgents.find((agent) => agent.id === id);
  };

  // Function to render agent icon with custom class
  const renderAgentIcon = (agent: any, customClass: string) => {
    const icon = agent?.icon;
    if (!icon) return null;

    // Clone the icon element with a new className
    return React.cloneElement(icon, { className: customClass });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/90">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section with AI Focus */}
        <section className="container mx-auto px-6 pt-10 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="animate-fade-in bg-gradient-to-r from-brand-blue/80 to-brand-light-blue/80 text-white">
                <Brain className="mr-1.5 h-3.5 w-3.5" />
                AI-Powered Investment Intelligence
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-tight animate-fade-in animate-delay-100">
                {displayedText}
                <span className="animate-pulse">|</span>
              </h1>
              <p className="text-xl text-muted-foreground animate-fade-in animate-delay-300">
                Our advanced AI agents analyze the Colombo Stock Exchange 24/7,
                providing you with real-time insights, detecting patterns, and
                helping you make data-driven investment decisions.
              </p>
              <div className="flex flex-wrap gap-4 pt-4 animate-fade-in animate-delay-400">
                <Button className="bg-gradient-to-r from-brand-blue to-brand-light-blue hover:from-brand-blue/90 hover:to-brand-light-blue/90 transition-all duration-300 text-lg px-8 py-6 h-auto shadow-glow">
                  <span>Get Started with AI</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/features">
                  <Button
                    variant="outline"
                    className="text-lg px-8 py-6 h-auto border-2 border-brand-blue/30 hover:border-brand-blue/60"
                  >
                    <Brain className="mr-2 h-5 w-5" />
                    Explore AI Agents
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-blue/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-light-blue/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
              <div className="glass-card rounded-2xl p-6 lg:p-10 animate-fade-in animate-delay-300 border border-white/20 dark:border-white/10 shadow-glow z-10 relative">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-medium flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-brand-blue" />
                    AI Market Pulse
                  </h3>
                  <Badge variant="outline">Live Insights</Badge>
                </div>
                <div className="grid gap-4">
                  {agentInsights.map((insight, idx) => {
                    const agent = getAgentById(insight.agentId);
                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-black/5 dark:bg-white/5 rounded-lg border border-border/30"
                      >
                        <div
                          className={`rounded-full p-2 bg-gradient-to-r ${agent?.color} text-white`}
                        >
                          {agent && renderAgentIcon(agent, "h-5 w-5")}
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {agent?.name}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {insight.content}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Button className="bg-gradient-to-r from-brand-blue to-brand-light-blue hover:from-brand-blue/90 hover:to-brand-light-blue/90 transition-all duration-300 text-lg px-8 py-6 h-auto shadow-glow">
                <span>Explore All Features</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Market Overview Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge
                variant="outline"
                className="bg-brand-blue/10 text-brand-blue"
              >
                Live Market Data
              </Badge>
              <h2 className="text-3xl font-medium mt-4 mb-6">
                Colombo Stock Exchange at a glance
              </h2>
              <p className="text-lg text-muted-foreground">
                Get real-time insights into the CSE with AI-enriched market data
                and personalized watchlists.
              </p>
            </div>

            <div className="glass-card rounded-xl p-6 border border-white/20 dark:border-white/10 mb-8">
              <MarketOverview />
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-medium">Top Performing Stocks</h3>
                  <div className="flex items-center">
                    <Badge className="mr-2 bg-brand-blue/10 text-brand-blue">
                      AI Analyzed
                    </Badge>
                    <Button variant="outline" size="sm" className="text-xs h-8">
                      <ChevronDown className="h-3.5 w-3.5 mr-1" />
                      Filter
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  {mockStocks.slice(0, visibleStocks).map((stock, idx) => (
                    <StockCard key={idx} stock={stock} />
                  ))}
                </div>
                {visibleStocks < mockStocks.length && (
                  <div className="text-center mt-6">
                    <Button
                      variant="ghost"
                      className="text-brand-blue"
                      onClick={() => setVisibleStocks(mockStocks.length)}
                    >
                      Show All Stocks
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-medium">Market Sentiment</h3>
                  <Badge className="bg-brand-blue/10 text-brand-blue">
                    AI Powered
                  </Badge>
                </div>
                <SentimentAnalysis />

                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-medium">Latest News</h3>
                    <Badge className="bg-brand-blue/10 text-brand-blue">
                      AI Analyzed
                    </Badge>
                  </div>
                  <NewsFeed />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-brand-blue/10 to-brand-light-blue/10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Badge
                variant="outline"
                className="bg-brand-blue/20 text-brand-blue"
              >
                Get Started Today
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-medium mt-4 mb-6">
                Ready to transform your investment approach with AI?
              </h2>
              <p className="text-xl text-muted-foreground mb-10">
                Join thousands of investors who are already leveraging the power
                of AI to make smarter investment decisions in the Colombo Stock
                Exchange.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="bg-gradient-to-r from-brand-blue to-brand-light-blue hover:from-brand-blue/90 hover:to-brand-light-blue/90 transition-all duration-300 text-lg px-8 py-6 h-auto shadow-glow">
                  <span>Start Your Free Trial</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="text-lg px-8 py-6 h-auto border-2 border-brand-blue/30 hover:border-brand-blue/60"
                >
                  <Brain className="mr-2 h-5 w-5" />
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* AI Agents Showcase Section */}
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge
                variant="outline"
                className="bg-brand-blue/10 text-brand-blue animate-fade-in"
              >
                Meet Your AI Team
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-medium mt-4 mb-6 animate-fade-in animate-delay-100">
                Four specialized AI agents working for you 24/7
              </h2>
              <p className="text-xl text-muted-foreground animate-fade-in animate-delay-200">
                Our AI agents continuously analyze market data, financial
                documents, news, and risk factors to provide you with actionable
                insights.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {aiAgents.map((agent, idx) => (
                <div
                  key={agent.id}
                  className={`glass-card rounded-xl p-6 border border-white/20 dark:border-white/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                    animatedItems.includes(idx)
                      ? "animate-fade-in"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${300 + idx * 150}ms` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`rounded-lg p-3 bg-gradient-to-r ${agent.color} text-white`}
                    >
                      {agent.icon}
                    </div>
                    <div className="bg-black/10 dark:bg-white/10 rounded-lg px-2 py-1 text-xs">
                      <div className="flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5" />
                        <span>{agent.stats.speed} avg. response</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2">{agent.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {agent.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Accuracy</span>
                      <span className="font-medium">
                        {agent.stats.accuracy}%
                      </span>
                    </div>
                    <Progress value={agent.stats.accuracy} className="h-1.5" />
                  </div>

                  <div className="space-y-2">
                    {agent.capabilities.slice(0, 2).map((capability, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-blue mr-2"></div>
                        <span>{capability}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-5 border-brand-blue/30 hover:border-brand-blue/60 hover:bg-brand-blue/5"
                    onClick={() => setActiveAgentTab(agent.id)}
                  >
                    Learn More
                  </Button>
                </div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto mt-16 glass-card rounded-xl overflow-hidden border border-white/20 dark:border-white/10 animate-fade-in animate-delay-500">
              <div className="p-1 bg-black/5 dark:bg-white/5 flex">
                {aiAgents.map((agent) => (
                  <button
                    key={agent.id}
                    className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all ${
                      activeAgentTab === agent.id
                        ? `bg-gradient-to-r ${agent.color} text-white`
                        : "hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                    onClick={() => setActiveAgentTab(agent.id)}
                  >
                    {agent.name}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {aiAgents
                  .filter((agent) => agent.id === activeAgentTab)
                  .map((agent) => (
                    <div key={agent.id} className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-medium mb-3">
                          {agent.name} in Action
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {agent.description} to help you make better investment
                          decisions. Here's how it works:
                        </p>

                        <div className="space-y-4 mt-6">
                          <div className="flex items-start gap-3">
                            <div className="rounded-full h-7 w-7 bg-brand-blue/20 flex items-center justify-center text-brand-blue">
                              1
                            </div>
                            <div>
                              <h4 className="font-medium">Data Collection</h4>
                              <p className="text-sm text-muted-foreground">
                                {agent.id === "market-analyst" &&
                                  "Gathers real-time market data, historical prices, and trading volumes"}
                                {agent.id === "document-analyst" &&
                                  "Aggregates financial reports, regulatory filings, and corporate announcements"}
                                {agent.id === "sentiment-tracker" &&
                                  "Monitors news sources, social media, and analyst reports"}
                                {agent.id === "risk-advisor" &&
                                  "Evaluates your portfolio, market conditions, and economic indicators"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="rounded-full h-7 w-7 bg-brand-blue/20 flex items-center justify-center text-brand-blue">
                              2
                            </div>
                            <div>
                              <h4 className="font-medium">
                                Intelligent Analysis
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {agent.id === "market-analyst" &&
                                  "Identifies patterns, trends, and anomalies using advanced algorithms"}
                                {agent.id === "document-analyst" &&
                                  "Extracts key insights and financial metrics using natural language processing"}
                                {agent.id === "sentiment-tracker" &&
                                  "Gauges market sentiment and emotional drivers behind stock movements"}
                                {agent.id === "risk-advisor" &&
                                  "Calculates risk metrics and identifies potential vulnerability points"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="rounded-full h-7 w-7 bg-brand-blue/20 flex items-center justify-center text-brand-blue">
                              3
                            </div>
                            <div>
                              <h4 className="font-medium">
                                Actionable Insights
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {agent.id === "market-analyst" &&
                                  "Delivers trading opportunities and market insights directly to your dashboard"}
                                {agent.id === "document-analyst" &&
                                  "Summarizes complex documents and highlights key information you should know"}
                                {agent.id === "sentiment-tracker" &&
                                  "Alerts you to significant sentiment shifts that could impact stock prices"}
                                {agent.id === "risk-advisor" &&
                                  "Recommends portfolio adjustments to optimize your risk-reward profile"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <div
                          className={`rounded-xl p-5 w-full bg-gradient-to-r ${agent.color} text-white`}
                        >
                          <div className="flex gap-2 mb-4 items-center">
                            <div className="p-2 rounded-lg bg-white/20">
                              {renderAgentIcon(agent, "h-6 w-6")}
                            </div>
                            <h4 className="font-medium">{agent.name} Demo</h4>
                          </div>
                          <div className="bg-black/20 rounded-lg p-4">
                            {agent.id === "market-analyst" && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <MessageSquare className="h-4 w-4 shrink-0" />
                                  <div className="text-sm">
                                    Find bullish stocks in the banking sector
                                    with increasing volume
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Bot className="h-4 w-4 shrink-0" />
                                  <div className="text-sm">
                                    Analyzing 12 stocks in the banking sector...
                                  </div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <Bot className="h-4 w-4 shrink-0 mt-1" />
                                  <div className="text-sm">
                                    <p className="mb-1">
                                      <strong>3 stocks identified</strong>{" "}
                                      showing bullish patterns with volume
                                      confirmation:
                                    </p>
                                    <p>• COMB: +2.3% with 2.5x avg volume</p>
                                    <p>• HNB: +1.8% with 1.7x avg volume</p>
                                    <p>• SAMP: +3.2% with 3.1x avg volume</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {agent.id === "document-analyst" && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <MessageSquare className="h-4 w-4 shrink-0" />
                                  <div className="text-sm">
                                    Summarize the latest quarterly report for
                                    JKH
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Bot className="h-4 w-4 shrink-0" />
                                  <div className="text-sm">
                                    Processing JKH Q2 2025 financial report...
                                  </div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <Bot className="h-4 w-4 shrink-0 mt-1" />
                                  <div className="text-sm">
                                    <p className="mb-1">
                                      <strong>
                                        Key findings from JKH Q2 Report:
                                      </strong>
                                    </p>
                                    <p>• Revenue: LKR 54.3B (+12% YoY)</p>
                                    <p>• Net profit: LKR 5.2B (+15% YoY)</p>
                                    <p>
                                      • Leisure segment: Outstanding growth (28%
                                      YoY)
                                    </p>
                                    <p>
                                      • Dividend: LKR 1.50 per share (increased
                                      from LKR 1.25)
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {agent.id === "sentiment-tracker" && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <MessageSquare className="h-4 w-4 shrink-0" />
                                  <div className="text-sm">
                                    What's the sentiment around Dialog Axiata?
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Bot className="h-4 w-4 shrink-0" />
                                  <div className="text-sm">
                                    Analyzing sentiment across 14 news sources
                                    and social media...
                                  </div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <Bot className="h-4 w-4 shrink-0 mt-1" />
                                  <div className="text-sm">
                                    <p className="mb-1">
                                      <strong>
                                        Sentiment analysis for DIAL:
                                      </strong>
                                    </p>
                                    <p>
                                      • Current sentiment: Very positive
                                      (82/100)
                                    </p>
                                    <p>
                                      • 215% increase in social media mentions
                                    </p>
                                    <p>
                                      • Major catalyst: 5G infrastructure
                                      expansion
                                    </p>
                                    <p>
                                      • 8 analysts upgraded ratings in past week
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {agent.id === "risk-advisor" && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <MessageSquare className="h-4 w-4 shrink-0" />
                                  <div className="text-sm">
                                    Analyze the risk in my current portfolio
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Bot className="h-4 w-4 shrink-0" />
                                  <div className="text-sm">
                                    Running risk assessment on 12 holdings...
                                  </div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <Bot className="h-4 w-4 shrink-0 mt-1" />
                                  <div className="text-sm">
                                    <p className="mb-1">
                                      <strong>Risk assessment summary:</strong>
                                    </p>
                                    <p>
                                      • Overall risk score: Medium-high (68/100)
                                    </p>
                                    <p>
                                      • Manufacturing sector over-exposure (32%)
                                    </p>
                                    <p>
                                      • Recommend reducing HAYL position by 40%
                                    </p>
                                    <p>
                                      • Consider adding defensive stocks like
                                      LION
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Highlight */}
        <section className="py-20 bg-gradient-to-b from-muted/20 to-background/90">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge
                variant="outline"
                className="bg-brand-blue/10 text-brand-blue"
              >
                Key Features
              </Badge>
              <h2 className="text-3xl font-medium mt-4 mb-6">
                How AI transforms your investment approach
              </h2>
              <p className="text-lg text-muted-foreground">
                Our platform combines the power of AI with comprehensive market
                data to give you the edge in the Colombo Stock Exchange.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              <div className="glass-card rounded-xl p-6 border border-white/20 dark:border-white/10">
                <div className="p-2 w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-medium mb-2">
                  AI-Powered Analysis
                </h3>
                <p className="text-muted-foreground">
                  Our AI agents analyze millions of data points to identify
                  patterns, correlations, and anomalies that human analysts
                  might miss.
                </p>
              </div>

              <div className="glass-card rounded-xl p-6 border border-white/20 dark:border-white/10">
                <div className="p-2 w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-medium mb-2">
                  Intelligent Recommendations
                </h3>
                <p className="text-muted-foreground">
                  Get personalized investment recommendations based on your risk
                  profile, investment goals, and market conditions.
                </p>
              </div>

              <div className="glass-card rounded-xl p-6 border border-white/20 dark:border-white/10">
                <div className="p-2 w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-medium mb-2">AI Assistant</h3>
                <p className="text-muted-foreground">
                  Ask questions and get instant answers about stocks, market
                  trends, and investment strategies from our AI assistant.
                </p>
              </div>

              <div className="glass-card rounded-xl p-6 border border-white/20 dark:border-white/10">
                <div className="p-2 w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-medium mb-2">Automated Research</h3>
                <p className="text-muted-foreground">
                  Let our AI agents do the research for you, summarizing
                  financial reports and regulatory filings to extract key
                  insights.
                </p>
              </div>

              <div className="glass-card rounded-xl p-6 border border-white/20 dark:border-white/10">
                <div className="p-2 w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-medium mb-2">Advanced Analytics</h3>
                <p className="text-muted-foreground">
                  Access sophisticated analytical tools and visualizations to
                  better understand market dynamics and make informed decisions.
                </p>
              </div>

              <div className="glass-card rounded-xl p-6 border border-white/20 dark:border-white/10">
                <div className="p-2 w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-medium mb-2">Real-Time Alerts</h3>
                <p className="text-muted-foreground">
                  Receive instant notifications about significant market
                  movements, news impacts, and investment opportunities.
                </p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Button className="bg-gradient-to-r from-brand-blue to-brand-light-blue hover:from-brand-blue/90 hover:to-brand-light-blue/90 transition-all duration-300 text-lg px-8 py-6 h-auto shadow-glow">
                <span>Explore All Features</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-brand-blue/10 to-brand-light-blue/10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Badge
                variant="outline"
                className="bg-brand-blue/20 text-brand-blue"
              >
                Get Started Today
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-medium mt-4 mb-6">
                Ready to transform your investment approach with AI?
              </h2>
              <p className="text-xl text-muted-foreground mb-10">
                Join thousands of investors who are already leveraging the power
                of AI to make smarter investment decisions in the Colombo Stock
                Exchange.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="bg-gradient-to-r from-brand-blue to-brand-light-blue hover:from-brand-blue/90 hover:to-brand-light-blue/90 transition-all duration-300 text-lg px-8 py-6 h-auto shadow-glow">
                  <span>Start Your Free Trial</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="text-lg px-8 py-6 h-auto border-2 border-brand-blue/30 hover:border-brand-blue/60"
                >
                  <Brain className="mr-2 h-5 w-5" />
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EnhancedLandingPage;
