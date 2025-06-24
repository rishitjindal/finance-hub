import React from 'react';
import { Transaction, Account } from '../../types';
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from 'lucide-react';

interface DashboardStatsProps {
  transactions: Transaction[];
  accounts: Account[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ transactions, accounts }) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const thisMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
  });

  const totalIncome = thisMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = thisMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netWorth = accounts.reduce((sum, account) => sum + account.balance, 0);
  const savings = totalIncome - totalExpenses;

  const stats = [
    {
      title: 'Total Income',
      value: totalIncome,
      change: '+12.5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'emerald'
    },
    {
      title: 'Total Expenses',
      value: totalExpenses,
      change: '-3.2%',
      trend: 'down',
      icon: TrendingDown,
      color: 'rose'
    },
    {
      title: 'Net Worth',
      value: netWorth,
      change: '+8.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: 'Monthly Savings',
      value: savings,
      change: '+15.3%',
      trend: 'up',
      icon: CreditCard,
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      rose: 'bg-rose-50 border-rose-200 text-rose-700',
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      purple: 'bg-purple-50 border-purple-200 text-purple-700'
    };
    return colors[color as keyof typeof colors];
  };

  const getIconColor = (color: string) => {
    const colors = {
      emerald: 'text-emerald-500',
      rose: 'text-rose-500',
      blue: 'text-blue-500',
      purple: 'text-purple-500'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className={`p-6 rounded-xl border ${getColorClasses(stat.color)} transition-all duration-200 hover:shadow-md`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-white/50`}>
                <Icon className={`h-5 w-5 ${getIconColor(stat.color)}`} />
              </div>
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">
                ${stat.value.toLocaleString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};