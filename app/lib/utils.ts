import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEthAmount(amount: string): string {
  const num = parseFloat(amount);
  if (num < 0.001) {
    return `${(num * 1000).toFixed(2)}m ETH`;
  }
  return `${num.toFixed(4)} ETH`;
}

export function formatUsdAmount(ethAmount: string, ethPrice: number = 3000): string {
  const usd = parseFloat(ethAmount) * ethPrice;
  if (usd < 0.01) {
    return `$${(usd * 100).toFixed(1)}¢`;
  }
  return `$${usd.toFixed(2)}`;
}

export function shortenAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function generateTipId(): string {
  return `tip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
