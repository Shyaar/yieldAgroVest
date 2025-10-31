import React from 'react'
import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { hederaTestnet, type AppKitNetwork } from '@reown/appkit/networks'

const queryClient = new QueryClient()

const projectId = 'YOUR_PROJECT_ID'

const metadata = {
  name: 'Yield',
  description: 'A decentralized platform connecting investors and farmers',
  url: 'http://localhost:5173',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// ✅ 1. Use hederaTestnet network (EVM-compatible)
const networks = [hederaTestnet] as [AppKitNetwork, ...AppKitNetwork[]]

// ✅ 2. Create the Wagmi adapter
const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
  ssr: true
})

// ✅ 3. Initialize AppKit
createAppKit({
  projectId,
  metadata,
  adapters: [wagmiAdapter],
  networks,
  features: { analytics: true },
  themeMode: 'light',
})

export function AppKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
