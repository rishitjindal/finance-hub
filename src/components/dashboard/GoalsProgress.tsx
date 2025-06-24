import React from 'react';
import { Goal } from '../../types';
import { Target, Calendar, TrendingUp } from 'lucide-react';

interface GoalsProgressProps {
  goals: Goal[];
}

export const GoalsProgress: React.FC<GoalsProgressProps> = ({ goals }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-rose-100 text-rose-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-emerald-100 text-emerald-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'savings':
        return Target;
      case 'investment':
        return TrendingUp;
      default:
        return Target;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Goals Progress</h3>
          <p className="text-sm text-gray-600">Track your financial goals</p>
        </div>
      </div>

      <div className="space-y-4">
        {goals.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No goals set
          </div>
        ) : (
          goals.slice(0, 3).map((goal) => {
            const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
            const Icon = getCategoryIcon(goal.category);
            const daysLeft = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

            return (
              <div key={goal.id} className="p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{goal.title}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                    {goal.priority}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    {percentage.toFixed(1)}% complete
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};