
import { useState } from 'react';
import { ArrowUp, ArrowDown, ChevronRight, BarChart3, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LineChart from '@/components/ui/LineChart';
import { cn } from '@/lib/utils';

interface StockCardProps {
  stock: {
    symbol: string;
    name: string;
    price: number;
    change: number;
    percentChange: number;
    volume: number;
    pe: number;
    marketCap: number;
    dividend: number;
    sector: string;
    data: { date: string; value: number }[];
  };
  className?: string;
}

const StockCard = ({ stock, className }: StockCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isPositive = stock.change >= 0;

  const formatCurrency = (value: number) => {
    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)}M`;
    } else {
      return value.toLocaleString();
    }
  };

  return (
    <div 
      className={cn(
        "glass-card rounded-2xl p-5 transition-all duration-300 border border-border/50",
        isHovered && "shadow-card-hover transform-gpu translate-y-[-4px]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{stock.symbol}</h3>
            <Badge variant="outline" className="text-xs">
              {stock.sector}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{stock.name}</p>
        </div>
        <div className={cn(
          "flex items-center space-x-1",
          isPositive ? "text-market-up" : "text-market-down"
        )}>
          {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          <span className="text-sm font-medium">{stock.percentChange.toFixed(2)}%</span>
        </div>
      </div>
      
      <div className="flex items-end justify-between mb-2">
        <span className="text-2xl font-medium">{stock.price.toLocaleString()}</span>
        <span className={cn(
          "text-sm font-medium",
          isPositive ? "text-market-up" : "text-market-down"
        )}>
          {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}
        </span>
      </div>
      
      <div className="h-[100px] -mx-1">
        <LineChart 
          data={stock.data} 
          height={100}
          showXAxis={false}
          isPositive={isPositive}
          tooltipFormatter={(value) => `LKR ${value.toLocaleString()}`}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">P/E</span>
          <span className="font-medium">{stock.pe.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Volume</span>
          <span className="font-medium">{formatCurrency(stock.volume)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Market Cap</span>
          <span className="font-medium">LKR {formatCurrency(stock.marketCap)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Dividend</span>
          <span className="font-medium">{stock.dividend.toFixed(2)}%</span>
        </div>
      </div>
      
      <div className="mt-4 flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1.5 flex-1 justify-center"
        >
          <BarChart3 size={14} />
          <span>Analysis</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1.5 flex-1 justify-center"
        >
          <TrendingUp size={14} />
          <span>Forecast</span>
        </Button>
      </div>
    </div>
  );
};

export default StockCard;
