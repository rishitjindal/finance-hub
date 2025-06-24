import React, { useState } from 'react';
import { Transaction } from '../types';
import { TransactionForm } from './TransactionForm';
import { TransactionList } from './TransactionList';
import { Plus, Filter, Download, Upload } from 'lucide-react';

interface TransactionsViewProps {
  transactions: Transaction[];
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({ 
  transactions, 
  onAddTransaction 
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-1">Manage your income and expenses</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Upload className="h-4 w-4" />
            <span>Import</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Transaction List */}
      <TransactionList transactions={transactions} />

      {/* Transaction Form Modal */}
      {isFormOpen && (
        <TransactionForm
          onAddTransaction={onAddTransaction}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};