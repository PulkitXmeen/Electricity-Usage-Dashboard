import React from 'react';
import { Power, Wifi, WifiOff, AlertTriangle, CheckCircle } from 'lucide-react';
import type { DeviceStatus } from '../../types';

interface DeviceControlProps {
  status: DeviceStatus;
  onToggleRelay: () => void;
}

export const DeviceControl: React.FC<DeviceControlProps> = ({ status, onToggleRelay }) => {
  const getStatusColor = () => {
    if (!status.isConnected) return 'text-red-500';
    if (status.sensorHealth === 'error') return 'text-red-500';
    if (status.sensorHealth === 'warning') return 'text-amber-500';
    return 'text-emerald-500';
  };

  const getStatusIcon = () => {
    if (!status.isConnected) return <WifiOff className="w-5 h-5" />;
    if (status.sensorHealth === 'error') return <AlertTriangle className="w-5 h-5" />;
    if (status.sensorHealth === 'warning') return <AlertTriangle className="w-5 h-5" />;
    return <CheckCircle className="w-5 h-5" />;
  };

  const getStatusText = () => {
    if (!status.isConnected) return 'Disconnected';
    if (status.sensorHealth === 'error') return 'Sensor Error';
    if (status.sensorHealth === 'warning') return 'Sensor Warning';
    return 'Connected';
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Device Control</h3>
          <p className="text-sm text-gray-600 mt-1">Manage your IoT device and relay</p>
        </div>
        <div className={`flex items-center space-x-2 ${getStatusColor()}`}>
          {getStatusIcon()}
          <span className="text-sm font-medium">{getStatusText()}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${status.isConnected ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
            <div>
              <p className="font-medium text-gray-900">IoT Connection</p>
              <p className="text-xs text-gray-500">
                Last reading: {status.lastReading.toLocaleTimeString()}
              </p>
            </div>
          </div>
          {status.isConnected ? <Wifi className="w-5 h-5 text-emerald-500" /> : <WifiOff className="w-5 h-5 text-red-500" />}
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${status.isRelayActive ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
            <div>
              <p className="font-medium text-gray-900">Smart Relay</p>
              <p className="text-xs text-gray-500">
                Status: {status.isRelayActive ? 'Active' : 'Disconnected'}
              </p>
            </div>
          </div>
          <button
            onClick={onToggleRelay}
            disabled={!status.isConnected}
            className={`p-2 rounded-lg transition-all duration-200 ${
              status.isRelayActive
                ? 'bg-red-100 text-red-600 hover:bg-red-200 hover:scale-105'
                : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200 hover:scale-105'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Power className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700 flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4" />
          <span>Smart cutoff will trigger automatically when budget limit is exceeded</span>
        </p>
      </div>
    </div>
  );
};