import React from 'react';
import { Transaction, Budget, Goal, Account } from '../types';
import { DashboardStats } from './dashboard/DashboardStats';
import { RecentTransactions } from './dashboard/RecentTransactions';
import { BudgetOverview } from './dashboard/BudgetOverview';
import { GoalsProgress } from './dashboard/GoalsProgress';
import { SpendingChart } from './dashboard/SpendingChart';
import { AccountBalances } from './dashboard/AccountBalances';

interface DashboardProps {
  transactions: Transaction[];
  budgets: Budget[];
  goals: Goal[];
  accounts: Account[];
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  transactions, 
  budgets, 
  goals, 
  accounts 
}) => {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your financial overview.</p>
        </div>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long', 
            day: 'numeric'
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <DashboardStats transactions={transactions} accounts={accounts} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <SpendingChart transactions={transactions} />
          <RecentTransactions transactions={transactions.slice(0, 5)} />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <AccountBalances accounts={accounts} />
          <BudgetOverview budgets={budgets} />
          <GoalsProgress goals={goals} />
        </div>
      </div>
    </div>
  );
};