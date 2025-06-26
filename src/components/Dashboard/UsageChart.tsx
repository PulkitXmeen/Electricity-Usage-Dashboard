import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import type { UsageData } from '../../types';

interface UsageChartProps {
  data: UsageData[];
  type?: 'line' | 'area';
}

export const UsageChart: React.FC<UsageChartProps> = ({ data, type = 'area' }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900 mb-2">{formatDate(label)}</p>
          <div className="space-y-1">
            <p className="text-sm text-sky-600">
              Usage: <span className="font-semibold">{payload[0].value} kWh</span>
            </p>
            <p className="text-sm text-emerald-600">
              Cost: <span className="font-semibold">${payload[1]?.value || (payload[0].value * 0.12).toFixed(2)}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  if (type === 'area') {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Daily Usage Trend</h3>
          <p className="text-sm text-gray-600">Last 30 days energy consumption</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="#666"
                fontSize={12}
              />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="usage" 
                stroke="#0EA5E9" 
                strokeWidth={2}
                fill="url(#usageGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Usage & Cost Analysis</h3>
        <p className="text-sm text-gray-600">Energy consumption vs. cost correlation</p>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="#666"
              fontSize={12}
            />
            <YAxis stroke="#666" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="usage" 
              stroke="#0EA5E9" 
              strokeWidth={3}
              dot={{ fill: '#0EA5E9', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#0EA5E9', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="cost" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};