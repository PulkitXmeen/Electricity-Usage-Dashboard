import React from 'react';
import { Lightbulb, TrendingDown, Leaf } from 'lucide-react';
import type { EnergyTip } from '../../types';

const mockTips: EnergyTip[] = [
  {
    id: '1',
    title: 'Optimize Heating Schedule',
    description: 'Your heating usage peaks at 8 PM. Consider lowering the temperature by 2°F after 10 PM to save up to 15% on heating costs.',
    category: 'heating',
    savings: '$12-18/month'
  },
  {
    id: '2',
    title: 'LED Light Upgrade',
    description: 'Based on your lighting patterns, switching to LED bulbs could reduce lighting costs by 75%.',
    category: 'lighting',
    savings: '$8-12/month'
  },
  {
    id: '3',
    title: 'Standby Power Reduction',
    description: 'Devices in standby mode are consuming 8% of your total energy. Use smart power strips to eliminate phantom loads.',
    category: 'appliances',
    savings: '$5-8/month'
  }
];

export const EnergyTips: React.FC = () => {
  const getCategoryIcon = (category: EnergyTip['category']) => {
    switch (category) {
      case 'heating':
      case 'cooling':
        return '🌡️';
      case 'lighting':
        return '💡';
      case 'appliances':
        return '🔌';
      default:
        return '⚡';
    }
  };

  const getCategoryColor = (category: EnergyTip['category']) => {
    switch (category) {
      case 'heating':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'cooling':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'lighting':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'appliances':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-green-50 text-green-700 border-green-200';
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>Smart Energy Tips</span>
          </h3>
          <p className="text-sm text-gray-600 mt-1">Personalized recommendations based on your usage</p>
        </div>
        <div className="flex items-center space-x-1 text-emerald-600">
          <Leaf className="w-4 h-4" />
          <span className="text-xs font-medium">AI Powered</span>
        </div>
      </div>

      <div className="space-y-4">
        {mockTips.map((tip) => (
          <div key={tip.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getCategoryIcon(tip.category)}</span>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{tip.title}</h4>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(tip.category)} mt-1`}>
                    {tip.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-emerald-600">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-semibold">{tip.savings}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{tip.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-emerald-800">Potential Monthly Savings</span>
        </div>
        <p className="text-2xl font-bold text-emerald-700">$25-38</p>
        <p className="text-xs text-emerald-600 mt-1">
          Implementing these recommendations could reduce your energy bill significantly
        </p>
      </div>
    </div>
  );
};