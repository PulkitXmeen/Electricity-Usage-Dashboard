import React, { useState } from 'react';
import { DollarSign, TrendingUp, AlertCircle, Edit3, Check, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const BudgetManager: React.FC = () => {
  const { user, updateBudget, updateAlertThreshold } = useAuth();
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [isEditingThreshold, setIsEditingThreshold] = useState(false);
  const [budgetValue, setBudgetValue] = useState(user?.budget?.toString() || '');
  const [thresholdValue, setThresholdValue] = useState(user?.alertThreshold?.toString() || '');

  if (!user) return null;

  const budgetProgress = (user.currentSpend / user.budget) * 100;
  const isNearLimit = budgetProgress >= user.alertThreshold;
  const isOverBudget = budgetProgress >= 100;

  const handleBudgetSave = () => {
    const newBudget = parseFloat(budgetValue);
    if (newBudget > 0) {
      updateBudget(newBudget);
      setIsEditingBudget(false);
    }
  };

  const handleThresholdSave = () => {
    const newThreshold = parseFloat(thresholdValue);
    if (newThreshold > 0 && newThreshold <= 100) {
      updateAlertThreshold(newThreshold);
      setIsEditingThreshold(false);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Budget Manager</h3>
          <p className="text-sm text-gray-600">Monitor and control your energy spending</p>
        </div>
        <DollarSign className="w-6 h-6 text-emerald-600" />
      </div>

      <div className="space-y-6">
        {/* Budget Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Monthly Budget</span>
            <div className="flex items-center space-x-2">
              {isEditingBudget ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={budgetValue}
                    onChange={(e) => setBudgetValue(e.target.value)}
                    className="w-20 px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleBudgetSave}
                    className="p-1 text-emerald-600 hover:bg-emerald-100 rounded"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingBudget(false);
                      setBudgetValue(user.budget.toString());
                    }}
                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold">${user.budget}</span>
                  <button
                    onClick={() => setIsEditingBudget(true)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                isOverBudget
                  ? 'bg-gradient-to-r from-red-500 to-red-600'
                  : isNearLimit
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600'
                  : 'bg-gradient-to-r from-emerald-500 to-green-600'
              }`}
              style={{ width: `${Math.min(budgetProgress, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">${user.currentSpend} spent</span>
            <span className={`font-medium ${isOverBudget ? 'text-red-600' : 'text-gray-600'}`}>
              {budgetProgress.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Alert Threshold */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Alert Threshold</span>
            <div className="flex items-center space-x-2">
              {isEditingThreshold ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={thresholdValue}
                    onChange={(e) => setThresholdValue(e.target.value)}
                    className="w-16 px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                  <span className="text-sm">%</span>
                  <button
                    onClick={handleThresholdSave}
                    className="p-1 text-emerald-600 hover:bg-emerald-100 rounded"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingThreshold(false);
                      setThresholdValue(user.alertThreshold.toString());
                    }}
                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold">{user.alertThreshold}%</span>
                  <button
                    onClick={() => setIsEditingThreshold(true)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Receive alerts when spending reaches this percentage of your budget
          </p>
        </div>

        {/* Status Alert */}
        {(isNearLimit || isOverBudget) && (
          <div className={`p-4 rounded-lg flex items-center space-x-3 ${
            isOverBudget ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
          }`}>
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">
                {isOverBudget ? 'Budget Exceeded!' : 'Approaching Budget Limit'}
              </p>
              <p className="text-xs mt-1">
                {isOverBudget 
                  ? 'Smart cutoff may activate to prevent additional charges'
                  : 'Consider reducing energy consumption to stay within budget'
                }
              </p>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-sky-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <TrendingUp className="w-4 h-4 text-sky-600" />
              <span className="text-xs text-sky-600 font-medium">Remaining</span>
            </div>
            <p className="text-lg font-bold text-sky-700">
              ${Math.max(0, user.budget - user.currentSpend).toFixed(2)}
            </p>
          </div>
          <div className="text-center p-3 bg-emerald-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span className="text-xs text-emerald-600 font-medium">Daily Avg</span>
            </div>
            <p className="text-lg font-bold text-emerald-700">
              ${(user.currentSpend / new Date().getDate()).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};