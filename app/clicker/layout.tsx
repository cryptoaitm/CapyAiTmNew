'use client'

import { WALLET_MANIFEST_URL } from '@/utils/consts';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

import '@mysten/dapp-kit/dist/index.css';

import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const networks = {
	devnet: { url: getFullnodeUrl('devnet') },
	mainnet: { url: getFullnodeUrl('mainnet') },
};
export default function MyApp({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <TonConnectUIProvider manifestUrl={WALLET_MANIFEST_URL}>
            <QueryClientProvider client={queryClient}>
			<SuiClientProvider networks={networks} defaultNetwork="devnet">
				<WalletProvider>
            {children}
            </WalletProvider>
			</SuiClientProvider>
		</QueryClientProvider>
        </TonConnectUIProvider>
    );
}
