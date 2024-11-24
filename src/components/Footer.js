import React from 'react';
import styled from 'styled-components';

// 样式组件
const FooterContainer = styled.footer`
  background-color: #000;
  color: #fff;
  padding: 40px 5%;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  box-sizing: border-box;
  padding: 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const WelcomeSection = styled.div`
  h1 {
    font-size: clamp(24px, 4vw, 48px);
    margin-bottom: 30px;
    font-weight: normal;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  
  a {
    display: block;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.1);
    }
    
    img {
      width: clamp(40px, 5vw, 60px);
      height: auto;
      border-radius: 50%;
    }
  }
`;

const QRCodeSection = styled.div`
  display: flex;
  gap: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const QRCodeItem = styled.div`
  text-align: center;
  
  img {
    width: clamp(100px, 12vw, 150px);
    height: auto;
    margin-bottom: 15px;
  }
  
  h3 {
    font-size: clamp(14px, 2vw, 16px);
    font-weight: normal;
    white-space: pre-line;
    line-height: 1.4;
  }
`;

const CopyrightText = styled.p`
  font-size: 12px;
  color: #666;
  margin-top: 40px;
  text-align: left;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <ContentWrapper>
        <WelcomeSection>
          <h1>Welcome to our community.</h1>
          <SocialLinks>
            <a href="https://x.com/Cuta_games" target="_blank" rel="noopener noreferrer">
              <img src="/Images/footer_icon1.png" alt="Twitter" />
            </a>
            <a href="https://discord.gg/MuEfuEJmrC" target="_blank" rel="noopener noreferrer">
              <img src="/Images/footer_icon2.png" alt="Discord" />
            </a>
          </SocialLinks>
        </WelcomeSection>
        
        <QRCodeSection>
          <QRCodeItem>
            <img src="/Images/qrcode1.png" alt="Business QR Code" />
            <h3>Business Cooperation</h3>
          </QRCodeItem>
          <QRCodeItem>
            <img src="/Images/qrcode2.png" alt="Telegram QR Code" />
            <h3>Telegram official{'\n'}communication group</h3>
          </QRCodeItem>
        </QRCodeSection>
      </ContentWrapper>
      
      <CopyrightText>
        Copyright © 2024 Cuta Corporation. Except for the "Cuta" "CutaGames" trademark, 
        Cuta disclaims any ownership rights of any kind to the other trademarks appearing on this website.
        Such other trademarks are the property of their respective owners.
      </CopyrightText>
    </FooterContainer>
  );
}

export default Footer;
