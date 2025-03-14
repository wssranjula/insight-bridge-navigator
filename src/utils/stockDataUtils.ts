
// Mock stock data generator
export const generateMockStockData = (
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

// Create mock stock data collection
export const getMockStocks = () => [
  generateMockStockData('JKH', 'John Keells Holdings PLC', 142.75, 3.25, 520000, 14.3, 18.9e9, 2.1, 'Diversified'),
  generateMockStockData('COMB', 'Commercial Bank of Ceylon PLC', 95.50, -1.75, 380000, 9.2, 10.5e9, 3.2, 'Banking'),
  generateMockStockData('DIAL', 'Dialog Axiata PLC', 18.60, 0.40, 1250000, 11.8, 15.2e9, 4.5, 'Telecommunications'),
  generateMockStockData('LOLC', 'LOLC Holdings PLC', 198.25, 5.50, 210000, 6.5, 9.4e9, 1.8, 'Financial Services'),
  generateMockStockData('HAYL', 'Hayleys PLC', 78.30, -2.10, 180000, 12.3, 5.9e9, 2.3, 'Manufacturing'),
  generateMockStockData('CTC', 'Ceylon Tobacco Company PLC', 950.75, 15.25, 65000, 8.6, 17.8e9, 5.4, 'Consumer Goods')
];
