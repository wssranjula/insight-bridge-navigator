
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Mock sentiment data
const sentimentData = {
  overall: 62, // 0-100 scale, where 50 is neutral
  breakdown: [
    { name: 'Positive', value: 45, color: '#34D399' },
    { name: 'Neutral', value: 35, color: '#94A3B8' },
    { name: 'Negative', value: 20, color: '#F87171' }
  ],
  sources: [
    { name: 'News Articles', sentiment: 58 },
    { name: 'Social Media', sentiment: 65 },
    { name: 'Analyst Reports', sentiment: 72 },
    { name: 'Regulatory Filings', sentiment: 53 }
  ]
};

const SentimentAnalysis = () => {
  // Calculate sentiment category
  const getSentimentCategory = (score: number) => {
    if (score >= 70) return { label: 'Very Positive', color: 'text-green-500' };
    if (score >= 60) return { label: 'Positive', color: 'text-green-400' };
    if (score >= 45) return { label: 'Slightly Positive', color: 'text-green-300' };
    if (score >= 40) return { label: 'Neutral', color: 'text-gray-400' };
    if (score >= 30) return { label: 'Slightly Negative', color: 'text-red-300' };
    if (score >= 20) return { label: 'Negative', color: 'text-red-400' };
    return { label: 'Very Negative', color: 'text-red-500' };
  };

  const sentimentCategory = getSentimentCategory(sentimentData.overall);

  // Render sentiment gauge
  const renderSentimentGauge = () => {
    const rotation = (sentimentData.overall / 100) * 180;
    
    return (
      <div className="relative w-full h-32 mt-4">
        {/* Gauge background */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-r from-red-400 via-gray-300 to-green-400 rounded-t-full opacity-20"></div>
        
        {/* Gauge needle */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-24 flex flex-col items-center">
          <div 
            className="w-0.5 h-20 bg-foreground origin-bottom transform-gpu transition-transform duration-1000 ease-in-out" 
            style={{ transform: `rotate(${rotation - 90}deg)` }}
          ></div>
          <div className="w-4 h-4 rounded-full bg-foreground"></div>
        </div>
        
        {/* Scale labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-6 text-xs text-muted-foreground">
          <span>Negative</span>
          <span>Neutral</span>
          <span>Positive</span>
        </div>
        
        {/* Score */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center">
          <span className="text-3xl font-medium">{sentimentData.overall}</span>
          <div className={cn("text-sm font-medium mt-1", sentimentCategory.color)}>
            {sentimentCategory.label}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Market Sentiment Analysis</h2>
        <Badge variant="info">AI-Powered</Badge>
      </div>
      
      {renderSentimentGauge()}
      
      <div className="mt-8">
        <h3 className="text-sm font-medium mb-3">Sentiment Breakdown</h3>
        <div className="flex items-center justify-around">
          {sentimentData.breakdown.map((item) => (
            <div key={item.name} className="text-center">
              <div className="relative w-12 h-12 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <circle 
                    cx="18" cy="18" r="16"
                    fill="none" 
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-muted/20"
                  />
                  <circle 
                    cx="18" cy="18" r="16"
                    fill="none" 
                    stroke={item.color}
                    strokeWidth="3"
                    strokeDasharray={`${item.value} 100`}
                    strokeLinecap="round"
                    transform="rotate(-90 18 18)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                  {item.value}%
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-sm font-medium mb-3">By Source</h3>
        <div className="space-y-2">
          {sentimentData.sources.map((source) => {
            const category = getSentimentCategory(source.sentiment);
            
            return (
              <div key={source.name} className="flex items-center justify-between">
                <span className="text-sm">{source.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-700 ease-in-out"
                      style={{ 
                        width: `${source.sentiment}%`, 
                        backgroundColor: source.sentiment >= 50 ? '#34D399' : '#F87171',
                        opacity: Math.abs((source.sentiment - 50) / 50) + 0.3
                      }}
                    ></div>
                  </div>
                  <span className={cn("text-sm font-medium", category.color)}>
                    {source.sentiment}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysis;
