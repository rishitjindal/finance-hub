import React from 'react';
import { Account } from '../../types';
import { Wallet, CreditCard, PiggyBank, TrendingUp } from 'lucide-react';

interface AccountBalancesProps {
  accounts: Account[];
}

export const AccountBalances: React.FC<AccountBalancesProps> = ({ accounts }) => {
  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'checking':
        return Wallet;
      case 'savings':
        return PiggyBank;
      case 'credit':
        return CreditCard;
      case 'investment':
        return TrendingUp;
      default:
        return Wallet;
    }
  };

  const getAccountColor = (type: string) => {
    switch (type) {
      case 'checking':
        return 'text-blue-600 bg-blue-100';
      case 'savings':
        return 'text-emerald-600 bg-emerald-100';
      case 'credit':
        return 'text-rose-600 bg-rose-100';
      case 'investment':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Account Balances</h3>
          <p className="text-sm text-gray-600">Your financial accounts</p>
        </div>
      </div>

      <div className="space-y-4">
        {accounts.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No accounts added
          </div>
        ) : (
          accounts.map((account) => {
            const Icon = getAccountIcon(account.type);
            return (
              <div key={account.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getAccountColor(account.type)}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{account.name}</p>
                    <p className="text-sm text-gray-500 capitalize">{account.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${account.balance.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">{account.currency}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};