'use client';

import { useState, useEffect } from 'react';
import { TipButton } from './TipButton';
import { ProfileHeader } from './ProfileHeader';
import { TransactionStatus } from './TransactionStatus';
import { Creator, Tip, ContentPost } from '@/app/types';

interface FarcasterFrameProps {
  variant?: 'default';
}

export function FarcasterFrame({ variant = 'default' }: FarcasterFrameProps) {
  const [transactionStatus, setTransactionStatus] = useState<{
    show: boolean;
    variant: 'pending' | 'success' | 'error';
    message: string;
    txHash?: string;
  }>({ show: false, variant: 'pending', message: '' });

  // Mock creator data
  const creator: Creator = {
    farcasterId: 'creator123',
    baseWalletAddress: '0x742d35Cc6634C0532925a3b8D62464CDD6506f96',
    contentPosts: [],
    displayName: 'Creator Name',
    username: 'creator',
  };

  const post: ContentPost = {
    postId: 'post123',
    creatorId: creator.farcasterId,
    text: "Just launched my new Base MiniApp! 🚀 Building the future of decentralized social, one tip at a time.",
    likesCount: 42,
    timestamp: Date.now() - 3600000, // 1 hour ago
  };

  const handleTipStart = () => {
    setTransactionStatus({
      show: true,
      variant: 'pending',
      message: 'Processing your tip...',
    });
  };

  const handleTipComplete = (tip: Tip) => {
    setTransactionStatus({
      show: true,
      variant: 'success',
      message: 'Tip sent successfully!',
      txHash: tip.transactionHash,
    });

    // Hide status after 5 seconds
    setTimeout(() => {
      setTransactionStatus(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  const handleTipError = (error: string) => {
    setTransactionStatus({
      show: true,
      variant: 'error',
      message: error,
    });

    // Hide status after 5 seconds
    setTimeout(() => {
      setTransactionStatus(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  return (
    <div className="max-w-md mx-auto bg-surface rounded-xl overflow-hidden glass-effect">
      {/* Creator Profile Header */}
      <ProfileHeader creator={creator} variant="withAvatarAndHandle" />
      
      {/* Post Content */}
      <div className="p-4">
        <p className="text-text-primary text-sm leading-relaxed mb-4">
          {post.text}
        </p>
        
        {/* Post Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-xs text-text-secondary">
            <span>{post.likesCount} likes</span>
            <span>{new Date(post.timestamp).toLocaleDateString()}</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <TipButton
            creatorId={creator.farcasterId}
            postId={post.postId}
            variant="primary"
            onTipStart={handleTipStart}
            onTipComplete={handleTipComplete}
            onTipError={handleTipError}
          />
        </div>
        
        {/* Transaction Status */}
        {transactionStatus.show && (
          <div className="mt-4">
            <TransactionStatus
              variant={transactionStatus.variant}
              message={transactionStatus.message}
              txHash={transactionStatus.txHash}
            />
          </div>
        )}
      </div>
    </div>
  );
}
