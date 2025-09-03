'use client';

import { useState } from 'react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';
import { Sparkles, Heart, TrendingUp, Users, Zap } from 'lucide-react';
import { FarcasterFrame } from './components/FarcasterFrame';
import { TipStats } from './components/TipStats';
import { ActivityFeedItem } from './components/ActivityFeedItem';
import { Button } from './components/ui/button';
import { Tip } from './types';

export default function Home() {
  const { address, isConnected } = useAccount();
  const [recentTips] = useState<Tip[]>([
    {
      tipId: 'tip_1',
      tipperId: '0x1234...5678',
      tippedCreatorId: 'creator123',
      amount: '0.005',
      timestamp: Date.now() - 300000,
      status: 'confirmed',
    },
    {
      tipId: 'tip_2',
      tipperId: '0x8765...4321',
      tippedCreatorId: 'creator123',
      amount: '0.001',
      timestamp: Date.now() - 600000,
      status: 'confirmed',
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="relative">
        {/* Header */}
        <header className="container mx-auto pt-8 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                <Heart className="h-6 w-6 text-black fill-current" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">TipJar</h1>
                <p className="text-sm text-text-secondary">Turn likes into love</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Wallet>
                <ConnectWallet />
              </Wallet>
            </div>
          </div>
        </header>

        <main className="container mx-auto pb-8">
          {!isConnected ? (
            /* Welcome Section */
            <div className="text-center py-16">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-accent flex items-center justify-center">
                      <Sparkles className="h-10 w-10 text-black" />
                    </div>
                    <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center">
                      <Heart className="h-3 w-3 text-white fill-current" />
                    </div>
                  </div>
                </div>
                
                <h2 className="text-4xl font-bold text-text-primary mb-4">
                  Tip Jar <span className="text-accent">+</span>
                </h2>
                
                <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                  Give back! You with your love and only of your choice to 
                  your own in the blockchain
                </p>
                
                <div className="flex items-center justify-center gap-6 text-text-secondary mb-8">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    <span className="text-sm">Micro Rewards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Wallet Earned</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button variant="tip" size="lg" className="text-lg">
                    Like to Tip
                    <Heart className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Latest Tips
                  </Button>
                </div>
                
                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                  <div className="p-6 rounded-xl glass-effect bg-surface/20">
                    <Heart className="h-8 w-8 text-accent mb-4 mx-auto" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      Direct Creator Tipping
                    </h3>
                    <p className="text-text-secondary text-sm">
                      Support creators instantly by liking their content
                    </p>
                  </div>
                  
                  <div className="p-6 rounded-xl glass-effect bg-surface/20">
                    <Zap className="h-8 w-8 text-purple-400 mb-4 mx-auto" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      Automated Rewards
                    </h3>
                    <p className="text-text-secondary text-sm">
                      Seamless micro-transactions powered by Base
                    </p>
                  </div>
                  
                  <div className="p-6 rounded-xl glass-effect bg-surface/20">
                    <Users className="h-8 w-8 text-blue-400 mb-4 mx-auto" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      Community Recognition
                    </h3>
                    <p className="text-text-secondary text-sm">
                      Build connections through visible support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Connected User Dashboard */
            <div className="space-y-8">
              {/* Stats Overview */}
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-6">Your Impact</h2>
                <TipStats
                  totalTips={128}
                  totalAmount="65.40"
                  uniqueTippers={34}
                  recentTips={12}
                />
              </div>
              
              {/* Main Content Area */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Content Feed */}
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-xl font-semibold text-text-primary">
                    Like to Tip
                  </h3>
                  <FarcasterFrame />
                </div>
                
                {/* Activity Sidebar */}
                <div className="space-y-6">
                  <div className="bg-surface/50 p-6 rounded-xl glass-effect">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-text-primary">
                        Tip Jar
                      </h3>
                      <TrendingUp className="h-5 w-5 text-accent" />
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-accent">$0.00</p>
                      <p className="text-sm text-text-secondary">Balance</p>
                      <p className="text-xs text-text-secondary mt-1">
                        $65 or Tip
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-surface/50 p-4 rounded-xl glass-effect">
                    <h4 className="font-semibold text-text-primary mb-4">Recent Tips</h4>
                    <div className="space-y-3">
                      {recentTips.map((tip) => (
                        <ActivityFeedItem 
                          key={tip.tipId} 
                          tip={tip} 
                          variant="tipNotification" 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-surface/30 p-4 rounded-xl glass-effect border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-400" />
                      <span className="text-sm font-medium text-text-primary">
                        Udit Day Poly Flyin
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary">
                      4340 4.5 on the income
                    </p>
                  </div>
                  
                  <div className="bg-surface/30 p-4 rounded-xl glass-effect border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full bg-blue-400" />
                      <span className="text-sm font-medium text-text-primary">
                        Tip by New New Tip
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary">
                      Tim White hat dip Env
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
