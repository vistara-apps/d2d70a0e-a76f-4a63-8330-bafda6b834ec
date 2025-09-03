'use client';

import { Avatar, Name, Address } from '@coinbase/onchainkit/identity';
import { Creator } from '@/app/types';

interface ProfileHeaderProps {
  creator: Creator;
  variant?: 'withAvatarAndHandle';
}

export function ProfileHeader({ creator, variant = 'withAvatarAndHandle' }: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-surface/50 rounded-lg glass-effect">
      {variant === 'withAvatarAndHandle' && (
        <>
          <Avatar 
            address={creator.baseWalletAddress as `0x${string}` | undefined}
            className="h-12 w-12"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Name 
                address={creator.baseWalletAddress as `0x${string}` | undefined}
                className="font-semibold text-text-primary"
              />
            </div>
            <Address 
              address={creator.baseWalletAddress as `0x${string}` | undefined}
              className="text-sm text-text-secondary"
            />
          </div>
        </>
      )}
    </div>
  );
}
