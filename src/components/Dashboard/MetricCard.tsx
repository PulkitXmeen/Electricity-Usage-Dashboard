import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  change?: number;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'amber' | 'red';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  change,
  icon: Icon,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'from-sky-500 to-blue-600',
    green: 'from-emerald-500 to-green-600',
    amber: 'from-amber-500 to-orange-600',
    red: 'from-red-500 to-pink-600'
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">{title}</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-gray-900">{value}</span>
              {unit && <span className="text-sm text-gray-500">{unit}</span>}
            </div>
          </div>
        </div>
        
        {change !== undefined && (
          <div className={`flex items-center space-x-1 text-sm ${
            change >= 0 ? 'text-emerald-600' : 'text-red-600'
          }`}>
            <span>{change >= 0 ? '+' : ''}{change.toFixed(1)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};