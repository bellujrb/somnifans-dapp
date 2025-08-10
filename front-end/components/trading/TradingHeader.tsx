'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  Bell,
  Settings,
  Coins,
  Zap,
  Shield
} from 'lucide-react';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWalletBalance } from '@/hooks/useWalletBalance';
import { useAccount } from 'wagmi';

interface TradingHeaderProps {
  selectedGame: string;
  onGameSelect: (gameId: string) => void;
}

const TradingHeader: React.FC<TradingHeaderProps> = ({
  }) => {
  // Usar dados reais do hook
  const { balance, hypeBalance, isLoading } = useWalletBalance();
  const { address } = useAccount();

  // Whitelist addresses (lowercase for comparison)
  const adminWhitelist = (process.env.NEXT_PUBLIC_ADMIN_WHITELIST ?? '')
    .split(',')
    .map(addr => addr.trim().toLowerCase())
    .filter(Boolean);
  const isAdmin = address && adminWhitelist.includes(address.toLowerCase());

  // Formatar os valores para exibição
  const formatBalance = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '0.00';
    return num.toFixed(2);
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side */}
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-black text-gray-900">Somnifans</span>
              <div className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">Trading</div>
            </div>
          </div>

          {/* Right Side - Token Balance */}
          <div className="flex items-center space-x-4">
            {/* CHZ Balance */}
            <div className="flex items-center space-x-2 bg-purple-50 px-3 py-2 rounded-xl border border-purple-200">
              <Coins className="w-4 h-4 text-purple-600" />
              <div className="text-sm">
                {isLoading ? (
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-purple-300 rounded-full animate-pulse"></div>
                    <span className="text-purple-500">Loading...</span>
                  </div>
                ) : (
                  <>
                    <span className="font-semibold text-purple-600">{formatBalance(balance)}</span>
                    <span className="text-purple-500 ml-1">STT</span>
                  </>
                )}
              </div>
            </div>

            {/* HYPE Balance */}
            <div className="flex items-center space-x-2 bg-brand-50 px-3 py-2 rounded-xl border border-brand-200">
              <Zap className="w-4 h-4 text-brand-600" />
              <div className="text-sm">
                {isLoading ? (
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-brand-300 rounded-full animate-pulse"></div>
                    <span className="text-brand-500">Loading...</span>
                  </div>
                ) : (
                  <>
                    <span className="font-semibold text-brand-600">{formatBalance(hypeBalance)}</span>
                    <span className="text-brand-500 ml-1">HYPE</span>
                  </>
                )}
              </div>
            </div>

            <div className="h-6 w-px bg-gray-300"></div>
            {isAdmin && (
              <Link href="/admin">
                <Button
                  variant="outline"
                  className="w-full border-brand-200 text-brand-600 hover:bg-brand-50 hover:border-brand-300 font-semibold"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Admin Panel
                </Button>
              </Link>
            )}

            {/* Apenas o botão oficial do RainbowKit */}
            <ConnectButton
              showBalance={false}
              accountStatus="avatar"
              chainStatus="icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingHeader;