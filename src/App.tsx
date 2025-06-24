import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { TransactionsView } from './components/TransactionsView';
import { BudgetManager } from './components/BudgetManager';
import { GoalsView } from './components/GoalsView';
import { Transaction, Budget, Goal, Account } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: '1',
      name: 'Main Checking',
      type: 'checking',
      balance: 5420.50,
      currency: 'USD'
    },
    {
      id: '2',
      name: 'Savings Account',
      type: 'savings',
      balance: 12750.00,
      currency: 'USD'
    },
    {
      id: '3',
      name: 'Investment Portfolio',
      type: 'investment',
      balance: 25300.75,
      currency: 'USD'
    }
  ]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('financeHub_transactions');
    const savedBudgets = localStorage.getItem('financeHub_budgets');
    const savedGoals = localStorage.getItem('financeHub_goals');
    const savedAccounts = localStorage.getItem('financeHub_accounts');
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
    
    if (savedBudgets) {
      setBudgets(JSON.parse(savedBudgets));
    }

    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }

    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts));
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('financeHub_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('financeHub_budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('financeHub_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('financeHub_accounts', JSON.stringify(accounts));
  }, [accounts]);

  const handleAddTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleUpdateBudgets = (newBudgets: Budget[]) => {
    setBudgets(newBudgets);
  };

  const handleUpdateGoals = (newGoals: Goal[]) => {
    setGoals(newGoals);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            transactions={transactions}
            budgets={budgets}
            goals={goals}
            accounts={accounts}
          />
        );
      case 'transactions':
        return (
          <TransactionsView
            transactions={transactions}
            onAddTransaction={handleAddTransaction}
          />
        );
      case 'budgets':
        return (
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Budget Management</h1>
              <p className="text-gray-600 mt-1">Set and track your spending limits</p>
            </div>
            <BudgetManager
              transactions={transactions}
              budgets={budgets}
              onUpdateBudgets={handleUpdateBudgets}
            />
          </div>
        );
      case 'goals':
        return (
          <GoalsView
            goals={goals}
            onUpdateGoals={handleUpdateGoals}
          />
        );
      case 'analytics':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-1">Detailed financial insights and reports</p>
            <div className="mt-8 text-center text-gray-500">
              Advanced analytics coming soon...
            </div>
          </div>
        );
      case 'accounts':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900">Accounts</h1>
            <p className="text-gray-600 mt-1">Manage your financial accounts</p>
            <div className="mt-8 text-center text-gray-500">
              Account management coming soon...
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Configure your preferences</p>
            <div className="mt-8 text-center text-gray-500">
              Settings panel coming soon...
            </div>
          </div>
        );
      default:
        return (
          <Dashboard
            transactions={transactions}
            budgets={budgets}
            goals={goals}
            accounts={accounts}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;