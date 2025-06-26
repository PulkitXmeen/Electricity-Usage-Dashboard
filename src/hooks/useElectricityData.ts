import { useState, useEffect } from 'react';
import type { ElectricityReading, UsageData, DeviceStatus } from '../types';

export const useElectricityData = () => {
  const [currentReading, setCurrentReading] = useState<ElectricityReading | null>(null);
  const [usageHistory, setUsageHistory] = useState<UsageData[]>([]);
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>({
    isConnected: true,
    isRelayActive: true,
    lastReading: new Date(),
    sensorHealth: 'good'
  });

  // Simulate real-time data from Bolt IoT
  useEffect(() => {
    const generateReading = (): ElectricityReading => {
      const current = 2.5 + Math.random() * 7.5; // 2.5-10A
      const voltage = 220 + Math.random() * 20; // 220-240V
      const power = (current * voltage) / 1000; // kW
      const cost = power * 0.12; // $0.12 per kWh
      
      return {
        id: Date.now().toString(),
        timestamp: new Date(),
        current: Number(current.toFixed(2)),
        voltage: Number(voltage.toFixed(1)),
        power: Number(power.toFixed(3)),
        cost: Number(cost.toFixed(4))
      };
    };

    const interval = setInterval(() => {
      setCurrentReading(generateReading());
      setDeviceStatus(prev => ({
        ...prev,
        lastReading: new Date(),
        isConnected: Math.random() > 0.05 // 95% uptime
      }));
    }, 2000);

    // Generate historical data
    const generateHistoricalData = () => {
      const data: UsageData[] = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const usage = 15 + Math.random() * 25; // 15-40 kWh per day
        data.push({
          date: date.toISOString().split('T')[0],
          usage: Number(usage.toFixed(2)),
          cost: Number((usage * 0.12).toFixed(2))
        });
      }
      setUsageHistory(data);
    };

    generateHistoricalData();
    return () => clearInterval(interval);
  }, []);

  const toggleRelay = async () => {
    // Simulate relay toggle
    setDeviceStatus(prev => ({
      ...prev,
      isRelayActive: !prev.isRelayActive
    }));
  };

  return {
    currentReading,
    usageHistory,
    deviceStatus,
    toggleRelay
  };
};