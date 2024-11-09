import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo, useState, useEffect } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { paymentService } from '../services/payment';
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

// 添加新的样式组件
const BalanceText = styled.p`
  color: #ffffff;
  font-size: 1.2rem;
  margin: 1rem 0;
`;

const TransactionButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  
  &:hover {
    background-color: #45a049;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

// 添加新的样式组件
const PaymentModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.show ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index:1000;
  oerflow-y:auto;
  padding:20px;
`;

const PaymentForm = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  /* 自定义滚动条样式 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }


`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.25rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #512da8;
    box-shadow: 0 0 0 3px rgba(81, 45, 168, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.25rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #512da8;
    box-shadow: 0 0 0 3px rgba(81, 45, 168, 0.1);
  }
`;

const OrderSummary = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: 1px solid #e9ecef;
`;

const FormTitle = styled.h3`
  color: #333;
  margin: 2rem 0 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  color: #555;
  font-size: 0.95rem;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const PaymentButton = styled(TransactionButton)`
  background-color: #512da8;
  color: white;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s ease;
  margin-top: 2rem;

  &:hover {
    background-color: #673ab7;
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #cccccc;
    transform: none;
  }
`;
//查看地址连接钱包的地址是否拥有指定的NFT
const checkForNFT = async (publicKey,connection) => {
  if (publicKey && connection){
    try{
      const hasNFT = await paymentService.checkNFTOwnership(publicKey,connection);
      return hasNFT;
    }catch(error){
      console.error('Error checking NFT ownership:', error);
      return false;
    }
  }
  return true
}



// 支付表单组件
const PaymentFormComponent = ({ show, onClose, publicKey, connection }) => {
  const [nftInfo, setNftInfo] = useState({ hasNFT: false, amount: 0 });
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    phone: '',
    saveInfo: false,
    emailUpdates: false,
    quantity: 1,
    walletAddress: publicKey?.toBase58()  || '',
    transactionHash: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkNFTStatus = async () => {
      if (publicKey && connection) {
        const result = await paymentService.checkNFTOwnershipAmount(publicKey, connection);
        setNftInfo(result);
        setFormData(prev => ({ ...prev, quantity: result.amount }));
      }
    };
    
    if (show) {
      checkNFTStatus();
    }
  }, [show, publicKey, connection]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsProcessing(true);
    // setError(null);

    // try {
    //   // 创建交易
    //   const transaction = await paymentService.createTransaction(
    //     publicKey, 
    //     connection,
    //     formData.quantity
    //   );

    //   // 发送交易
    //   const signature = await sendTransaction(transaction, connection);
      
    //   // 确认交易
    //   const success = await paymentService.confirmTransaction(signature, connection);
      
    //   if (success) {
    //     // 保存购买数据到数据库
    //     const purchaseData = {
    //       ...formData,
    //       transactionSignature: signature,
    //       nftAmount: formData.quantity,
    //       walletAddress: publicKey.toBase58()
    //     };

    //     await paymentService.savePurchaseData(purchaseData);
    //     onClose();
    //     alert('Purchase successful!');
    //   } else {
    //     setError('Transaction failed. Please try again.');
    //   }
    // } catch (error) {
    //   console.error('Purchase error:', error);
    //   setError(error.message || 'Failed to process purchase');
    // } finally {
    //   setIsProcessing(false);
    // }
  };

  // 添加数量验证函数
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= nftInfo.amount) {
      setFormData({ ...formData, quantity: value });
    }
  };

  return (
    <PaymentModal show={show}>
      <PaymentForm>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333' }}>CUTA</h2>
          <button 
            onClick={onClose} 
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: '1.5rem',
              color: '#666',
              padding: '0.5rem',
              transition: 'color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.color = '#333'}
            onMouseOut={(e) => e.target.style.color = '#666'}
          >
            ✕
          </button>        
        </div>

        <OrderSummary>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5rem'}}>
            <span>Wallet Address</span>
            <span>{publicKey?.toBase58().slice(0, 6)}...{publicKey?.toBase58().slice(-4)}</span>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5rem'}}>
            <span>Available NFTs:</span>
            <span>{nftInfo.amount}</span>
          </div>
          <FormGroup>
            <label>Quantity to redeem</label>
            <Input 
              type="number"
              min="1"
              max={nftInfo.amount}
              value={formData.quantity}
              onChange={handleQuantityChange}
              style={{
                width: '100%',
                marginTop: '0.5rem'
              }}
            />
            {formData.quantity > nftInfo.amount && (
              <span style={{
                color: 'red',
                fontSize: '0.875rem',
                marginTop: '0.25rem',
                display: 'block'
              }}>
                Cannot exceed your NFT balance ({nftInfo.amount})
              </span>
            )}
          </FormGroup>
        </OrderSummary>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Email</label>
            <Input 
              type="email" 
              required
              placeholder='your@email.com'
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </FormGroup>

          <FormGroup>
            <CheckboxLabel>
              <input 
                type="checkbox"
                checked={formData.emailUpdates}
                onChange={(e) => setFormData({...formData, emailUpdates: e.target.checked})}
              />

              <span>Email me with news and offers</span>
              </CheckboxLabel>
          </FormGroup>

          <FormTitle>Billing address</FormTitle>

          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'flex-start' }}>
            <FormGroup style={{ flex: 1 }}>
              <label>Country/Region</label>
              <CountryDropdown
                value={formData.country}
                onChange={(val) => setFormData({ ...formData, country: val })}
                priorityOptions={["United States", "Canada", "United Kingdom"]}
                defaultOptionLabel="Select a country"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  marginTop: '0.25rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              />
            </FormGroup>

            <FormGroup style={{ flex: 1 }}>
              <label>State/Province/Region</label>
              <RegionDropdown
                country={formData.country}
                value={formData.state}
                onChange={(val) => setFormData({ ...formData, state: val })}
                defaultOptionLabel='Select a region'
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  marginTop: '0.25rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <option value="">Select a region</option>
                <option value="California">California</option>
                {/* 可以添加更多州选项 */}
              </RegionDropdown>
            </FormGroup>
          </div>

          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'flex-start' }}>
            <FormGroup className="name-field" style={{ marginRight: '1rem' }}>
              <label>First name</label>
              <Input 
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </FormGroup>
            <FormGroup className="name-field">
              <label>Last name</label>
              <Input 
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </FormGroup>
          </div>

          <FormGroup>
            <label>Address (Please note we do not ship to PO boxes)</label>
            <Input 
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </FormGroup>

          <FormGroup>
            <label>Apartment, suite, etc. (optional)</label>
            <Input 
              type="text"
              value={formData.apartment}
              onChange={(e) => setFormData({...formData, apartment: e.target.value})}
            />
          </FormGroup>

          <div style={{ display: 'flex', gap: '10rem' }}>
            <FormGroup style={{ flex: 1 }}>
              <label>City</label>
              <Input 
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
              />
            </FormGroup>

            <FormGroup style={{ flex: 1 }}>
              <label>ZIP code</label>
              <Input 
                type="text"
                required
                value={formData.zipCode}
                onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
              />
            </FormGroup>
          </div>

          <FormGroup>
            <label>Phone</label>
            <Input 
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value;
                // 使用正则表达式验证输入，只允许数字
                if (/^\d*$/.test(value)) {
                  setFormData({ ...formData, phone: value });
                }
              }}
              placeholder="Enter your phone number"
            />
          </FormGroup>

          <FormGroup>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input 
                type="checkbox"
                checked={formData.saveInfo}
                onChange={(e) => setFormData({...formData, saveInfo: e.target.checked})}
              />
              Save this information for next time
            </label>
          </FormGroup>

          <TransactionButton 
            type="submit" 
            style={{ width: '100%' }}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Continue to payment'}
          </TransactionButton>
          {error && (
            <div style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}
        </form>
      </PaymentForm>
    </PaymentModal>
  );
};

// 修改钱包内容组件
const WalletContent = () => {
  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [hasNFT, setHasNFT] = useState(false);

  // 当钱包连接时候更新chi youNFT状态
  useEffect(() => {
    const checkNFTStatus = async () => {
      if (connected && publicKey && connection) {
        const nftStatus = await checkForNFT(publicKey, connection);
        setHasNFT(nftStatus);
      }
    };
    
    checkNFTStatus();
  }, [connected, publicKey, connection]);

  // 发送 SOL 示例
 

  return (
    <WalletContainer>
      <WalletSection>
        <h2 style={{ color: '#ffffff' }}>{connected ? 'Redeem your NFT' : 'Connect your wallet'}</h2>
        <CustomWalletButton />
        
        <WalletStatus>
          {connected ? (
            <>
              <p>Connected with: {publicKey?.toBase58().slice(0, 6)}...{publicKey?.toBase58().slice(-4)}</p>
              <p style={{ 
                color: hasNFT ? '#4CAF50' : '#ff4444',
                marginTop: '0.5rem' 
              }}>
                {hasNFT ? 'You own the required NFT' : 'You do not own the required NFT'}
              </p>
            </>
          ) : (
            <p>Please connect your wallet to continue</p>
          )}
        </WalletStatus>

        {connected && (
          <TransactionButton 
            onClick={() => {
              if (!hasNFT) {
                alert('Sorry, you do not own the required NFT');
                return;
              }
              setShowPaymentForm(true);
            }}
            disabled={isLoading || !hasNFT}
          >
            Purchase CUTA
          </TransactionButton>
        )}

        <PaymentFormComponent 
          show={showPaymentForm}
          onClose={() => setShowPaymentForm(false)}
          publicKey={publicKey}
          connection={connection}
        />
      </WalletSection>
    </WalletContainer>
  );
};

// 主组件，包含所有必要的 Provider
const PrePayment = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  
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
