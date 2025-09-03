'use client';

import { Heart, TrendingUp } from 'lucide-react';
import { Tip } from '@/app/types';
import { formatEthAmount, formatUsdAmount } from '@/app/lib/utils';

interface ActivityFeedItemProps {
  tip: Tip;
  variant?: 'tipNotification';
}

export function ActivityFeedItem({ tip, variant = 'tipNotification' }: ActivityFeedItemProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-surface/30 rounded-lg hover:bg-surface/50 transition-colors">
      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
          <Heart className="h-5 w-5 text-accent fill-current" />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary">
          New Tip Received
        </p>
        <p className="text-xs text-text-secondary truncate">
          From {tip.tipperId.slice(0, 6)}...{tip.tipperId.slice(-4)}
        </p>
      </div>
      
      <div className="flex-shrink-0 text-right">
        <p className="text-sm font-semibold text-accent">
          {formatEthAmount(tip.amount)}
        </p>
        <p className="text-xs text-text-secondary">
          {formatUsdAmount(tip.amount)}
        </p>
      </div>
    </div>
  );
}
