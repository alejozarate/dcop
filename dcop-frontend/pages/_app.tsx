import '../styles/globals.css'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import { ConnectButton, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig, createClient, configureChains, defaultChains, Chain, usePrepareContractWrite, useContractWrite } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import dCOPABI from '../constants/ABI.json'

import "@rainbow-me/rainbowkit/styles.css";
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {

const stardustChain: Chain = {
  id: 588,
  name: 'Stardust',
  network: 'Stardust',
  nativeCurrency: {
    decimals: 18,
    name: 'METIS',
    symbol: 'METIS',
  },
  rpcUrls: {
    default: 'https://stardust.metis.io/?owner=588',
  },
  blockExplorers: {
    default: { name: 'Stardust Explorer', url: 'https://stardust-explorer.metis.io/' },
  },
  testnet: true,
}

  const { provider, webSocketProvider } = configureChains([stardustChain], [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== stardustChain.id) return null
        return { http: chain.rpcUrls.default }
      },
    }),
  ],)


  const { connectors } = getDefaultWallets({
    appName: 'dCOP',
    chains: [stardustChain]
  });

  const client = createClient({
    provider,
    webSocketProvider,
    connectors
  })


  return <WagmiConfig client={client}>
  <RainbowKitProvider chains={defaultChains}><Component {...pageProps} /></RainbowKitProvider></WagmiConfig>
}

export default MyApp
