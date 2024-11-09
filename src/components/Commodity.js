import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #121212;
  min-height: 100vh;
  padding: 2rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductSlider = styled.div`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
`;

const ProductCard = styled.div`
  background-color: #1e1e1e;
  border-radius: 15px;
  padding: 3rem;
  margin: 1rem;
  text-align: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  
  img {
    width: 100%;
    max-width: 1600px;
    height: auto;
    margin-bottom: 2rem;
    border-radius: 8px;
    object-fit: contain;
  }
  
  h3 {
    font-size: clamp(1.5rem, 3vw, 2rem);
    margin-bottom: 1rem;
  }
  
  p {
    color: #888;
    margin-bottom: 1rem;
    font-size: clamp(1rem, 2vw, 1.2rem);
  }
  
  h4 {
    font-size: clamp(1.2rem, 2.5vw, 1.8rem);
    color: #fff;
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    
    img {
      max-width: 100%;
    }
  }
`;

const NavigationButton = styled.button`
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: clamp(0.8rem, 2vw, 1.2rem) clamp(1.5rem, 3vw, 2.5rem);
  border-radius: 8px;
  cursor: pointer;
  margin: 0 1rem;
  transition: all 0.3s ease;
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    margin: 0 0.5rem;
  }
`;

const Navigation = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Commodity = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const products = [
    {
      id: 1,
      name: "CUTA LITE",
      price: "$299",
      image: "/Images/commodity1.jpg",
      description: ""
    },
    {
      id: 2,
      name: "CUTA SUPER",
      price: "$399",
      image: "/Images/commodity2.jpg",
      description: ""
    },
    {
      id: 3,
      name: "CUTA XR",
      price: "$499",
      image: "/Images/commodity3.jpg",
      description: ""
    }
  ];

  const handlePrevious = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? products.length - 1 : prev - 1));
  }, [products.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev === products.length - 1 ? 0 : prev + 1));
  }, [products.length]);

  // 自动轮播
  useEffect(() => {
    let intervalId;
    
    if (!isPaused) {
      intervalId = setInterval(() => {
        handleNext();
      }, 3000); // 每3秒切换一次
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [handleNext, isPaused]);

  return (
    <Container>
      <ProductSlider>
        <ProductCard
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <img src={products[currentIndex].image} alt={products[currentIndex].name} />
          <h3>{products[currentIndex].name}</h3>
          <p>{products[currentIndex].description}</p>
          <h4>{products[currentIndex].price}</h4>
        </ProductCard>
        
        <Navigation>
          <NavigationButton onClick={handlePrevious}>The Last</NavigationButton>
          <NavigationButton onClick={handleNext}>The Next</NavigationButton>
        </Navigation>
      </ProductSlider>
    </Container>
  );
};

export default Commodity;
