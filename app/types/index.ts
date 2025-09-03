export interface User {
  farcasterId: string;
  baseWalletAddress?: string;
  tippingHistory: Tip[];
}

export interface Creator {
  farcasterId: string;
  baseWalletAddress?: string;
  contentPosts: ContentPost[];
  displayName?: string;
  avatar?: string;
  username?: string;
}

export interface Tip {
  tipId: string;
  tipperId: string;
  tippedCreatorId: string;
  amount: string; // in ETH as string to avoid precision issues
  transactionHash?: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface ContentPost {
  postId: string;
  creatorId: string;
  contentUrl?: string;
  likesCount: number;
  text?: string;
  timestamp: number;
}

export interface TipButtonProps {
  creatorId: string;
  postId?: string;
  defaultAmount?: string;
  variant?: 'primary' | 'secondary';
  onTipStart?: () => void;
  onTipComplete?: (tip: Tip) => void;
  onTipError?: (error: string) => void;
}

export interface TransactionStatusProps {
  variant: 'pending' | 'success' | 'error';
  message: string;
  txHash?: string;
}
