
import { useState, useEffect } from 'react';
import { ExternalLink, Calendar, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock news data
const newsItems = [
  {
    id: 1,
    title: 'Central Bank maintains policy rates amid economic stabilization',
    source: 'Daily Financial Times',
    date: '2 hours ago',
    url: '#',
    sentiment: 'neutral',
    sentimentScore: 0.1,
    category: 'Policy'
  },
  {
    id: 2,
    title: 'Dialog Axiata reports 15% growth in Q2 profits, exceeds analyst expectations',
    source: 'Lanka Business Online',
    date: '5 hours ago',
    url: '#',
    sentiment: 'positive',
    sentimentScore: 0.78,
    category: 'Earnings'
  },
  {
    id: 3,
    title: 'Colombo Port City project faces delays amid regulatory concerns',
    source: 'Economy Next',
    date: '8 hours ago',
    url: '#',
    sentiment: 'negative',
    sentimentScore: -0.62,
    category: 'Development'
  },
  {
    id: 4,
    title: 'CSE trading volume hits 3-month high as foreign investors return',
    source: 'Daily Mirror',
    date: '10 hours ago',
    url: '#',
    sentiment: 'positive',
    sentimentScore: 0.85,
    category: 'Market'
  },
  {
    id: 5,
    title: 'New tax regulations may impact banking sector profitability',
    source: 'The Sunday Times',
    date: '12 hours ago',
    url: '#',
    sentiment: 'negative',
    sentimentScore: -0.45,
    category: 'Regulation'
  }
];

const NewsFeed = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [filteredNews, setFilteredNews] = useState(newsItems);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const categories = ['all', 'policy', 'earnings', 'market', 'development', 'regulation'];

  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredNews(newsItems);
    } else {
      setFilteredNews(newsItems.filter(item => 
        item.category.toLowerCase() === activeTab.toLowerCase()
      ));
    }
  }, [activeTab]);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-market-up';
      case 'negative':
        return 'text-market-down';
      default:
        return 'text-market-neutral';
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Badge variant="positive">Positive</Badge>;
      case 'negative':
        return <Badge variant="negative">Negative</Badge>;
      default:
        return <Badge variant="neutral">Neutral</Badge>;
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="h-4 w-4 text-market-up" />;
      case 'negative':
        return <ThumbsDown className="h-4 w-4 text-market-down" />;
      default:
        return null;
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in">
      <h2 className="text-xl font-medium mb-6">Market News & Analysis</h2>
      
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {categories.map(category => (
          <button
            key={category}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all",
              activeTab === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
            onClick={() => setActiveTab(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="space-y-4">
        {filteredNews.map(item => (
          <div 
            key={item.id}
            className={cn(
              "p-4 rounded-xl border border-border/50 transition-all duration-300",
              hoveredItem === item.id ? "bg-secondary/30" : "bg-transparent"
            )}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium flex items-center gap-2">
                  {item.title}
                  {getSentimentIcon(item.sentiment)}
                </h3>
                <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                  <span>{item.source}</span>
                  <span>•</span>
                  <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1.5" />
                    {item.date}
                  </div>
                </div>
              </div>
              <div>
                {getSentimentBadge(item.sentiment)}
              </div>
            </div>
            
            <div className={cn(
              "overflow-hidden transition-all duration-300",
              hoveredItem === item.id ? "max-h-24 opacity-100 mt-3" : "max-h-0 opacity-0"
            )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    Sentiment score: 
                    <span className={cn("ml-1 font-medium", getSentimentColor(item.sentiment))}>
                      {item.sentimentScore > 0 ? '+' : ''}{item.sentimentScore.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs flex items-center gap-1.5"
                >
                  <span>Read More</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Button variant="outline" className="w-full mt-4">
        View All News
      </Button>
    </div>
  );
};

export default NewsFeed;
