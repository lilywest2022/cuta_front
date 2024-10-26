import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// 添加一个全局背景容器
const GlobalWrapper = styled.div`
  background-color: #000000;
  min-height: 100vh;
  padding: 20px;
  text-align: center;  // 添加文字居中
  color: white;  // 添加文字颜色
`;

const MainTitle = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
`;

const SubTitle = styled.h2`
  font-size: 36px;
  margin-bottom: 40px;
`;

const GameWindowWrapper = styled.div`
  width: 100%;
  max-width: 1200px; // 增加最大宽度
  margin: 0 auto;
  background-color: #000000;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; // 16:9 比例
  overflow: hidden;
  border-radius: 8px; // 添加圆角
  background-color: #111; // 添加背景色，防止图片加载时出现空白
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; // 改为 contain 以保持图片比例
`;

const ContentWrapper = styled.div`
  padding: 20px 0;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 10px;
  color: white;
  font-size: 28px;
  font-weight: bold;
`;

const HotTag = styled.span`
  background-color: #ee3333;
  color: white;
  padding: 6px 16px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

const Dot = styled.span`
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background-color: ${props => props.active ? '#ee3333' : '#555'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.active ? '#ee3333' : '#666'};
  }
`;

const GameWindow = () => {
  const [images, setImages] = useState([
    { url: './GameImages/game1.jpg', title: 'Fucking Sky', hot: true },
    { url: './GameImages/game2.jpg', title: 'Fucking Role', hot: true },
    { url: './GameImages/game3.jpg', title: 'Fucking Blast', hot: false },
    // ...
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (!images || images.length === 0) {
    return <GlobalWrapper>No images available</GlobalWrapper>;
  }

  return (
    <GlobalWrapper>
      <MainTitle>GAMES ON CUTA</MainTitle>
      <SubTitle>Game for playing on the CUTA games</SubTitle>
      <GameWindowWrapper>
        <ImageContainer>
          <Image 
            src={images[currentIndex].url} 
            alt={images[currentIndex].title} 
          />
        </ImageContainer>
        <ContentWrapper>
          <Title>
            {images[currentIndex].hot && <HotTag>HOT</HotTag>}
            {images[currentIndex].title}
          </Title>
          <Pagination>
            {images.map((_, index) => (
              <Dot
                key={index}
                active={index === currentIndex}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </Pagination>
        </ContentWrapper>
      </GameWindowWrapper>
    </GlobalWrapper>
  );
};

export default GameWindow;
