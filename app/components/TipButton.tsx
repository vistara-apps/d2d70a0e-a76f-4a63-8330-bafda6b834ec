'use client';

import { useState } from 'react';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { Heart, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { TipButtonProps, Tip } from '@/app/types';
import { generateTipId, formatEthAmount, formatUsdAmount } from '@/app/lib/utils';

export function TipButton({ 
  creatorId, 
  postId, 
  defaultAmount = "0.001", 
  variant = 'primary',
  onTipStart,
  onTipComplete,
  onTipError 
}: TipButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [tipAmount, setTipAmount] = useState(defaultAmount);
  const [showTipDialog, setShowTipDialog] = useState(false);
  const { address } = useAccount();
  const { data: hash, sendTransaction, isPending } = useSendTransaction();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handleLikeClick = () => {
    if (!address) {
      onTipError?.('Please connect your wallet first');
      return;
    }
    
    setShowTipDialog(true);
  };

  const handleTipConfirm = async () => {
    if (!address) return;
    
    try {
      onTipStart?.();
      
      // Mock creator address for demo - in real app this would come from API
      const creatorAddress = '0x742d35Cc6634C0532925a3b8D62464CDD6506f96';
      
      await sendTransaction({
        to: creatorAddress,
        value: parseEther(tipAmount),
      });

      const tip: Tip = {
        tipId: generateTipId(),
        tipperId: address,
        tippedCreatorId: creatorId,
        amount: tipAmount,
        transactionHash: hash,
        timestamp: Date.now(),
        status: 'pending'
      };

      setIsLiked(true);
      setShowTipDialog(false);
      
    } catch (error) {
      onTipError?.('Transaction failed');
      console.error('Tip failed:', error);
    }
  };

  if (isConfirmed && hash && onTipComplete) {
    const tip: Tip = {
      tipId: generateTipId(),
      tipperId: address!,
      tippedCreatorId: creatorId,
      amount: tipAmount,
      transactionHash: hash,
      timestamp: Date.now(),
      status: 'confirmed'
    };
    onTipComplete(tip);
  }

  if (showTipDialog) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-surface p-6 rounded-lg max-w-sm mx-4 glass-effect">
          <h3 className="text-lg font-semibold mb-4">Send a tip</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2">Amount</label>
              <input
                type="number"
                value={tipAmount}
                onChange={(e) => setTipAmount(e.target.value)}
                step="0.001"
                min="0.001"
                className="w-full p-3 rounded-md bg-background border border-white/20 text-text-primary"
                placeholder="0.001"
              />
              <p className="text-xs text-text-secondary mt-1">
                ≈ {formatUsdAmount(tipAmount)}
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowTipDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                variant="tip" 
                size="tip"
                onClick={handleTipConfirm}
                disabled={isPending || isConfirming}
                className="flex-1"
              >
                {isPending || isConfirming ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Send Tip'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Button 
      variant={variant === 'primary' ? 'tip' : 'outline'}
      size="tip"
      onClick={handleLikeClick}
      disabled={isPending || isConfirming}
      className="flex items-center gap-2"
    >
      {isPending || isConfirming ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          {isLiked ? 'Tipped!' : 'Like to Tip'}
        </>
      )}
    </Button>
  );
}
