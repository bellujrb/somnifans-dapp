"use client";

import '@rainbow-me/rainbowkit/styles.css';
import {
  connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  walletConnectWallet,
  metaMaskWallet,
  injectedWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { WagmiProvider, createConfig } from 'wagmi';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { http } from 'viem';
import { defineChain } from 'viem';
import React from "react";

// Definir a rede Somnia Testnet
const somniaTestnet = defineChain({
  id: 50312,
  name: 'Somnia Testnet',
  network: 'somnia-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'STT',
    symbol: 'STT',
  },
  rpcUrls: {
    default: {
      http: ['https://dream-rpc.somnia.network'],
    },
    public: {
      http: ['https://dream-rpc.somnia.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Shannon Explorer',
      url: 'https://shannon-explorer.somnia.network',
    },
    alternative: {
      name: 'Somnia Testnet SocialScan',
      url: 'https://somnia-testnet.socialscan.io',
    },
  },
  testnet: true,
});

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recomendado',
      wallets: [
        metaMaskWallet,
        injectedWallet,
        walletConnectWallet,
      ],
    },
  ],
  {
    appName: 'Somnifans',
    projectId: '3ac832407e6d725a1f6d2bdae6c1d049',
  }
);

const config = createConfig({
  connectors,
  chains: [somniaTestnet],
  transports: {
    [somniaTestnet.id]: http('https://dream-rpc.somnia.network'),
  },
});

const queryClient = new QueryClient();

export default function Web3Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}