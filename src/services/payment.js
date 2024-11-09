import api from './api';
import { PublicKey } from '@solana/web3.js';
export const paymentService = {
  // 提交支付信息
  submitPayment: async (paymentData) => {
    try {
      const response = await api.post('/payment', paymentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Payment submission failed');
    }
  },

  checkNFTOwnership: async (publicKey, connection) => {
    try {
      const nftMintAddress = process.env.REACT_APP_NFT_MINT_ADDRESS;
      const response = await connection.getParsedTokenAccountsByOwner(publicKey, {
        mint: new PublicKey(nftMintAddress),
      });
      return response.value.length > 0;
    } catch (error) {
      console.error('Error checking NFT ownership:', error);
      return false;
    }
  },

  // 查看用户所拥有的NFT的数量
  checkNFTOwnershipAmount: async (publicKey, connection) => {
    try {
      // const nftMintAddress = process.env.REACT_APP_NFT_MINT_ADDRESS;
      // const response = await connection.getParsedTokenAccountsByOwner(publicKey, {
      //   mint: new PublicKey(nftMintAddress),
      // });
      
      // const nftAmount = response.value.reduce((total, account) => {
      //   const tokenAmount = account.account.data.parsed.info.tokenAmount;
      //   return total + Number(tokenAmount.amount);
      // }, 0);

      // return {
      //   hasNFT: nftAmount > 0,
      //   amount: nftAmount
      // };
      return {
        hasNFT: true,
        amount: 3
      };
    } catch (error) {
      console.error('Error checking NFT amount:', error);
      return {
        hasNFT: false,
        amount: 0
      };
    }
  }
};

