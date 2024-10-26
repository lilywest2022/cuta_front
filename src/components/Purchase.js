import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // 确保已安装并导入styled-components

// 创建样式化组件
const PurchaseContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  padding: 20px 0;
  box-sizing: border-box;
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
`;

const ResponsiveImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: clamp(150px, 3vw, 40px);
  margin-top: clamp(20px, 4vw, 40px);
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  box-sizing: border-box;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: clamp(10px, 2vw, 20px);
    margin-top: 20px;
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
`;

const Button = styled.button`
  padding: clamp(10px, 1.5vw, 15px) clamp(20px, 3vw, 40px);
  font-size: clamp(14px, 1.5vw, 18px);
  cursor: pointer;
  border: none;
  border-radius: 5px;
  color: white;
  min-width: clamp(120px, 25vw, 200px);
  transition: all 0.3s ease;

  @media (max-width: 480px) {
    width: 80%;
    max-width: 300px;
  }

  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }
`;

const SoldOutButton = styled(Button)`
  background-color: #B22222;
`;

const PreorderButton = styled(Button)`
  background-color: #DAA520;
`;

const ComingSoonButton = styled(Button)`
  background-color: #4682B4;
`;

const Purchase = () => {
    const navigate = useNavigate();

    const handlePreorderClick = () => {
        navigate('/Purch');
    };

    return (
        <PurchaseContainer>
            <ImageWrapper>
                <ResponsiveImage src="./Images/purchase1.png" alt="Purchase 1" />
            </ImageWrapper>
            
            <ImageWrapper>
                <ResponsiveImage src="./Images/purchase2.png" alt="Purchase 2" />
            </ImageWrapper>
            
            <ButtonContainer>
                <SoldOutButton>Sold Out</SoldOutButton>
                <PreorderButton onClick={handlePreorderClick}>
                    Preorder 🛒
                </PreorderButton>
                <ComingSoonButton>Coming Soon</ComingSoonButton>
            </ButtonContainer>
        </PurchaseContainer>
    );
};

export default Purchase;
