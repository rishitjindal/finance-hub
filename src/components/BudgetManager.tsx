import React, { useState } from 'react';
import { Transaction } from './TransactionForm';
import { Edit2, Plus, Trash2 } from 'lucide-react';

interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
}

interface BudgetManagerProps {
  transactions: Transaction[];
  budgets: Budget[];
  onUpdateBudgets: (budgets: Budget[]) => void;
}

export const BudgetManager: React.FC<BudgetManagerProps> = ({ 
  transactions, 
  budgets, 
  onUpdateBudgets 
}) => {
  const [isAddingBudget, setIsAddingBudget] = useState(false);
  const [editingBudget, setEditingBudget] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [newLimit, setNewLimit] = useState('');

  const calculateSpentAmount = (category: string) => {
    return transactions
      .filter(t => t.type === 'expense' && t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const updatedBudgets = budgets.map(budget => ({
    ...budget,
    spent: calculateSpentAmount(budget.category)
  }));

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory || !newLimit) return;

    const newBudget: Budget = {
      id: Date.now().toString(),
      category: newCategory,
      limit: parseFloat(newLimit),
      spent: calculateSpentAmount(newCategory)
    };

    onUpdateBudgets([...budgets, newBudget]);
    setNewCategory('');
    setNewLimit('');
    setIsAddingBudget(false);
  };

  const handleDeleteBudget = (id: string) => {
    onUpdateBudgets(budgets.filter(b => b.id !== id));
  };

  const handleUpdateBudget = (id: string, newLimit: number) => {
    onUpdateBudgets(budgets.map(b => 
      b.id === id ? { ...b, limit: newLimit } : b
    ));
    setEditingBudget(null);
  };

  const getProgressColor = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  const getProgressBackground = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 100) return 'bg-red-50 border-red-200';
    if (percentage >= 80) return 'bg-yellow-50 border-yellow-200';
    return 'bg-emerald-50 border-emerald-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Budget Management</h2>
          <button
            onClick={() => setIsAddingBudget(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Budget</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {isAddingBudget && (
          <form onSubmit={handleAddBudget} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Food & Dining"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget Limit
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Budget
              </button>
              <button
                type="button"
                onClick={() => setIsAddingBudget(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {updatedBudgets.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No budgets set. Add a budget to start tracking your spending limits.
            </div>
          ) : (
            updatedBudgets.map((budget) => {
              const percentage = Math.min((budget.spent / budget.limit) * 100, 100);
              const isEditing = editingBudget === budget.id;

              return (
                <div
                  key={budget.id}
                  className={`p-4 rounded-lg border ${getProgressBackground(budget.spent, budget.limit)}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{budget.category}</h3>
                      {budget.spent > budget.limit && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                          Over Budget
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingBudget(budget.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBudget(budget.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                      <span>Spent: ${budget.spent.toFixed(2)}</span>
                      {isEditing ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            step="0.01"
                            defaultValue={budget.limit}
                            className="w-20 px-2 py-1 text-xs border border-gray-300 rounded"
                            onBlur={(e) => handleUpdateBudget(budget.id, parseFloat(e.target.value))}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleUpdateBudget(budget.id, parseFloat((e.target as HTMLInputElement).value));
                              }
                            }}
                            autoFocus
                          />
                        </div>
                      ) : (
                        <span>Budget: ${budget.limit.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(budget.spent, budget.limit)}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-700">
                      {percentage.toFixed(1)}% used
                    </span>
                    {budget.limit > budget.spent && (
                      <span className="text-xs text-gray-500 ml-2">
                        ${(budget.limit - budget.spent).toFixed(2)} remaining
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};