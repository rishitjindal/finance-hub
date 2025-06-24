import React from 'react';
import { Budget } from '../../types';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface BudgetOverviewProps {
  budgets: Budget[];
}

export const BudgetOverview: React.FC<BudgetOverviewProps> = ({ budgets }) => {
  const getProgressColor = (spent: number, limit: number, alertThreshold: number) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 100) return 'bg-rose-500';
    if (percentage >= alertThreshold) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  const getBudgetStatus = (spent: number, limit: number, alertThreshold: number) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 100) return { status: 'over', icon: AlertTriangle, color: 'text-rose-600' };
    if (percentage >= alertThreshold) return { status: 'warning', icon: AlertTriangle, color: 'text-yellow-600' };
    return { status: 'good', icon: CheckCircle, color: 'text-emerald-600' };
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Budget Overview</h3>
          <p className="text-sm text-gray-600">Monthly budget status</p>
        </div>
      </div>

      <div className="space-y-4">
        {budgets.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No budgets set
          </div>
        ) : (
          budgets.slice(0, 4).map((budget) => {
            const percentage = Math.min((budget.spent / budget.limit) * 100, 100);
            const status = getBudgetStatus(budget.spent, budget.limit, budget.alertThreshold);
            const StatusIcon = status.icon;

            return (
              <div key={budget.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{budget.category}</span>
                    <StatusIcon className={`h-4 w-4 ${status.color}`} />
                  </div>
                  <span className="text-sm text-gray-600">
                    ${budget.spent} / ${budget.limit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(budget.spent, budget.limit, budget.alertThreshold)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{percentage.toFixed(1)}% used</span>
                  <span>${(budget.limit - budget.spent).toFixed(2)} remaining</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};