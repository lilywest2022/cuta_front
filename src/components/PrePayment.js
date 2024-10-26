import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';
import styled from 'styled-components';
import '@solana/wallet-adapter-react-ui/styles.css';

// Styled components 保持不变
const WalletContainer = styled.div`
  background-color: #000000;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
`;

const WalletSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const WalletStatus = styled.div`
  color: #ffffff;
  font-size: 1.1rem;
  margin-top: 1rem;
`;

const CustomWalletButton = styled(WalletMultiButton)`
  background-color: #512da8 !important;
  &:hover {
    background-color: #673ab7 !important;
  }
`;

// 实际的钱包连接组件
const WalletContent = () => {
  const { publicKey, connected } = useWallet();

  return (
    <WalletContainer>
      <WalletSection>
        <h2 style={{ color: '#ffffff' }}>Connect Your Wallet</h2>
        <CustomWalletButton />
        
        <WalletStatus>
          {connected ? (
            <>
              <p>Connected with: {publicKey?.toBase58().slice(0, 6)}...{publicKey?.toBase58().slice(-4)}</p>
              {/* 这里可以添加支付相关的组件 */}
            </>
          ) : (
            <p>Please connect your wallet to continue</p>
          )}
        </WalletStatus>
      </WalletSection>
    </WalletContainer>
  );
};

// 主组件，包含所有必要的 Provider
const PrePayment = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), []);
  
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletContent />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default PrePayment;
