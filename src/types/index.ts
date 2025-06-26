export interface User {
  id: string;
  email: string;
  name: string;
  budget: number;
  currentSpend: number;
  alertThreshold: number;
}

export interface ElectricityReading {
  id: string;
  timestamp: Date;
  current: number;
  voltage: number;
  power: number;
  cost: number;
}

export interface UsageData {
  date: string;
  usage: number;
  cost: number;
}

export interface DeviceStatus {
  isConnected: boolean;
  isRelayActive: boolean;
  lastReading: Date;
  sensorHealth: 'good' | 'warning' | 'error';
}

export interface EnergyTip {
  id: string;
  title: string;
  description: string;
  category: 'heating' | 'cooling' | 'lighting' | 'appliances' | 'general';
  savings: string;
}