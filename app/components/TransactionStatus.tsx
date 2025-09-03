'use client';

import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { TransactionStatusProps } from '@/app/types';
import { cn } from '@/app/lib/utils';

export function TransactionStatus({ variant, message, txHash }: TransactionStatusProps) {
  const icons = {
    pending: Clock,
    success: CheckCircle2,
    error: AlertCircle,
  };

  const colors = {
    pending: 'text-yellow-400',
    success: 'text-green-400',
    error: 'text-red-400',
  };

  const bgColors = {
    pending: 'bg-yellow-400/10',
    success: 'bg-green-400/10', 
    error: 'bg-red-400/10',
  };

  const Icon = icons[variant];

  return (
    <div className={cn(
      'flex items-center gap-3 p-4 rounded-lg',
      bgColors[variant]
    )}>
      <Icon className={cn('h-5 w-5', colors[variant])} />
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
        {txHash && (
          <p className="text-xs text-text-secondary mt-1">
            Tx: {txHash.slice(0, 10)}...{txHash.slice(-8)}
          </p>
        )}
      </div>
    </div>
  );
}
