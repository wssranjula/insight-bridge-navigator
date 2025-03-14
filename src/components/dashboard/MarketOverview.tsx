
import { useEffect, useState } from 'react';
import LineChart from '@/components/ui/LineChart';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown, Percent } from 'lucide-react';

// Mock data
const generateMockData = () => {
  const baseValue = 12000;
  const fluctuation = 400;
  const today = new Date();
  const data = [];

  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    const random = Math.random() * fluctuation * 2 - fluctuation;
    const value = baseValue + (i * 30) + random;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Number(value.toFixed(2))
    });
  }
  
  return data;
};

// Mock indices
const indices = [
  { 
    name: 'ASPI', 
    value: 12735.82, 
    change: 125.43, 
    percentChange: 0.99, 
    isPositive: true,
    data: generateMockData()
  },
  { 
    name: 'S&P SL20', 
    value: 4352.16, 
    change: -23.56, 
    percentChange: -0.54, 
    isPositive: false,
    data: generateMockData().map(item => ({ ...item, value: item.value / 3 }))
  },
  { 
    name: 'CSE Finance', 
    value: 1824.39, 
    change: 18.75, 
    percentChange: 1.04, 
    isPositive: true,
    data: generateMockData().map(item => ({ ...item, value: item.value / 7 }))
  }
];

const MarketOverview = () => {
  const [animateIndex, setAnimateIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateIndex(prev => (prev + 1) % indices.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">Market Overview</h2>
        <Badge variant="default">Live</Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {indices.map((index, i) => (
          <div 
            key={index.name}
            className={cn(
              "space-y-3 transition-all duration-500",
              i === animateIndex && "scale-[1.02]"
            )}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{index.name}</h3>
                <p className="text-2xl font-medium mt-1">{index.value.toLocaleString()}</p>
              </div>
              <div className={cn(
                "flex items-center space-x-1",
                index.isPositive ? "text-market-up" : "text-market-down"
              )}>
                <span className="text-sm font-medium">{index.change > 0 ? '+' : ''}{index.change.toFixed(2)}</span>
                <div className="flex items-center px-1.5 py-0.5 rounded bg-muted/50">
                  {index.isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  <span className="text-xs font-medium ml-0.5">{Math.abs(index.percentChange).toFixed(2)}%</span>
                </div>
              </div>
            </div>
            
            <LineChart 
              data={index.data} 
              height={120} 
              showXAxis={false}
              isPositive={index.isPositive}
              tooltipFormatter={(value) => `${value.toLocaleString()}`}
              color={index.isPositive ? 'rgb(52, 211, 153)' : 'rgb(248, 113, 113)'}
            />
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-3">
          <Badge variant="secondary" className="flex items-center gap-1">
            Volume: 42.3M
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            Turnover: LKR 1.89B
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            Market Cap: LKR 4.2T
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1 bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400">
            Advancers: 124
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1 bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400">
            Decliners: 67
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            Unchanged: 31
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
