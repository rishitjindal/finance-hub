import React from 'react';
import { Transaction } from './TransactionForm';

interface CategoryChartProps {
  transactions: Transaction[];
}

export const CategoryChart: React.FC<CategoryChartProps> = ({ transactions }) => {
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  
  const categoryTotals = expenseTransactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  const totalExpenses = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);

  const categoryData = Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
    }))
    .sort((a, b) => b.amount - a.amount);

  const colors = [
    'bg-blue-500',
    'bg-emerald-500',
    'bg-purple-500',
    'bg-rose-500',
    'bg-yellow-500',
    'bg-indigo-500',
    'bg-pink-500',
    'bg-teal-500',
    'bg-orange-500'
  ];

  if (categoryData.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Spending by Category</h2>
        <div className="text-center text-gray-500 py-8">
          No expense data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Spending by Category</h2>
      
      <div className="space-y-4">
        {categoryData.map((item, index) => (
          <div key={item.category} className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <div className={`w-4 h-4 rounded-full ${colors[index % colors.length]}`} />
              <span className="text-sm font-medium text-gray-700">{item.category}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${colors[index % colors.length]}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <div className="text-right min-w-[80px]">
                <p className="text-sm font-semibold text-gray-900">
                  ${item.amount.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">
                  {item.percentage.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Total Expenses</span>
          <span className="text-lg font-bold text-gray-900">
            ${totalExpenses.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};