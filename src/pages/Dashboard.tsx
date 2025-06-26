import React from 'react';
import { Zap, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { Header } from '../components/Layout/Header';
import { MetricCard } from '../components/Dashboard/MetricCard';
import { UsageChart } from '../components/Dashboard/UsageChart';
import { DeviceControl } from '../components/Dashboard/DeviceControl';
import { BudgetManager } from '../components/Dashboard/BudgetManager';
import { EnergyTips } from '../components/Dashboard/EnergyTips';
import { useElectricityData } from '../hooks/useElectricityData';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { currentReading, usageHistory, deviceStatus, toggleRelay } = useElectricityData();
  const { user } = useAuth();

  const totalUsage = usageHistory.reduce((sum, day) => sum + day.usage, 0);
  const avgDailyUsage = totalUsage / usageHistory.length;
  const monthlyProjection = avgDailyUsage * 30;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-gray-600">
            Monitor your electricity usage and optimize your energy consumption
          </p>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Current Power"
            value={currentReading?.power.toFixed(2) || '0.00'}
            unit="kW"
            change={2.3}
            icon={Zap}
            color="blue"
          />
          <MetricCard
            title="Voltage"
            value={currentReading?.voltage.toFixed(0) || '0'}
            unit="V"
            change={-0.5}
            icon={Activity}
            color="green"
          />
          <MetricCard
            title="Current"
            value={currentReading?.current.toFixed(1) || '0.0'}
            unit="A"
            change={1.8}
            icon={TrendingUp}
            color="amber"
          />
          <MetricCard
            title="Cost Rate"
            value={currentReading?.cost.toFixed(4) || '0.0000'}
            unit="$/hr"
            change={-3.2}
            icon={DollarSign}
            color="red"
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <UsageChart data={usageHistory} />
          </div>
          <div className="space-y-6">
            <DeviceControl status={deviceStatus} onToggleRelay={toggleRelay} />
            <BudgetManager />
          </div>
        </div>

        {/* Secondary Charts and Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <UsageChart data={usageHistory} type="line" />
          <EnergyTips />
        </div>

        {/* Statistics Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Monthly Usage</h4>
            <p className="text-2xl font-bold text-gray-900">{totalUsage.toFixed(1)} kWh</p>
            <p className="text-xs text-gray-500 mt-1">This month so far</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Daily Average</h4>
            <p className="text-2xl font-bold text-gray-900">{avgDailyUsage.toFixed(1)} kWh</p>
            <p className="text-xs text-gray-500 mt-1">Based on last 30 days</p>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Projected Monthly</h4>
            <p className="text-2xl font-bold text-gray-900">{monthlyProjection.toFixed(1)} kWh</p>
            <p className="text-xs text-gray-500 mt-1">Based on current usage</p>
          </div>
        </div>
      </main>
    </div>
  );
};