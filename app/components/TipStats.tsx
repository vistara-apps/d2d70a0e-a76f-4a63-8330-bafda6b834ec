'use client';

import { TrendingUp, DollarSign, Users, Heart } from 'lucide-react';

interface TipStatsProps {
  totalTips: number;
  totalAmount: string;
  uniqueTippers: number;
  recentTips: number;
}

export function TipStats({ totalTips, totalAmount, uniqueTippers, recentTips }: TipStatsProps) {
  const stats = [
    {
      label: 'Total Tips',
      value: totalTips.toLocaleString(),
      icon: Heart,
      color: 'text-pink-400',
      bg: 'bg-pink-400/10',
    },
    {
      label: 'Total Amount',
      value: `$${parseFloat(totalAmount).toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-400',
      bg: 'bg-green-400/10',
    },
    {
      label: 'Unique Tippers',
      value: uniqueTippers.toLocaleString(),
      icon: Users,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
    },
    {
      label: 'Recent Tips',
      value: recentTips.toLocaleString(),
      icon: TrendingUp,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`p-4 rounded-lg ${stat.bg} glass-effect`}
          >
            <div className="flex items-center gap-3">
              <Icon className={`h-5 w-5 ${stat.color}`} />
              <div>
                <p className="text-lg font-semibold text-text-primary">
                  {stat.value}
                </p>
                <p className="text-xs text-text-secondary">
                  {stat.label}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
