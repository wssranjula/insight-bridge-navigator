
import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  TooltipProps
} from 'recharts';
import { cn } from '@/lib/utils';

type DataPoint = {
  date: string;
  value: number;
  [key: string]: any;
};

type LineChartProps = {
  data: DataPoint[];
  color?: string;
  gradient?: boolean;
  height?: number;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  areaChart?: boolean;
  className?: string;
  tooltipFormatter?: (value: number) => string;
  isPositive?: boolean;
};

const LineChart = ({
  data,
  color = '#0077CC',
  gradient = true,
  height = 300,
  showXAxis = true,
  showYAxis = false,
  showGrid = false,
  showTooltip = true,
  areaChart = false,
  className,
  tooltipFormatter = (value) => `${value}`,
  isPositive = true
}: LineChartProps) => {
  const chartColor = isPositive ? '#34D399' : '#F87171';
  const lineColor = color || (isPositive ? '#34D399' : '#F87171');
  
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-2 text-xs">
          <p className="text-foreground/80 mb-1">{label}</p>
          <p className="font-medium">
            {tooltipFormatter(payload[0].value as number)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        {areaChart ? (
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#eee" />}
            {showXAxis && (
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
            )}
            {showYAxis && (
              <YAxis
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={30}
              />
            )}
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={lineColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={lineColor}
              strokeWidth={2}
              fill={gradient ? "url(#colorValue)" : "transparent"}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </AreaChart>
        ) : (
          <RechartsLineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#eee" />}
            {showXAxis && (
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
            )}
            {showYAxis && (
              <YAxis
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={30}
              />
            )}
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            <Line
              type="monotone"
              dataKey="value"
              stroke={lineColor}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </RechartsLineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
