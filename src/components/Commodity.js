import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: aliceblue;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  perspective: 1000px;
`;

const ProductSlider = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
`;

const ProductWrapper = styled.div`
  display: contents;
  animation: slide 9s calc(-3s * var(--i)) steps(1) infinite;
  transform-style: preserve-3d;

  @keyframes slide {
    0%,100% {
      --rotateY: 0deg;
      --translateZ: 500px;
      --scale: 1;
      --z: 3;
    }
    33.33% {
      --rotateY: 120deg;
      --translateZ: 500px;
      --scale: 0.8;
      --z: 2;
    }
    66.67% {
      --rotateY: 240deg;
      --translateZ: 500px;
      --scale: 0.8;
      --z: 1;
    }
  }
`;

const ProductImage = styled.img`
  position: absolute;
  width: 300px;
  height: 250px;
  object-fit: cover;
  border-radius: 20px;
  transform-style: preserve-3d;
  transform: 
    rotateY(var(--rotateY))
    translateZ(var(--translateZ))
    scale(var(--scale));
  transition: transform 0.5s;
  z-index: var(--z);
  box-shadow: 0 8px 25px rgba(0,0,0,0.4);

  &:hover {
    transform: 
      rotateY(var(--rotateY))
      translateZ(calc(var(--translateZ) + 50px))
      scale(calc(var(--scale) * 1.1));
  }
`;

const Commodity = () => {
  const items = [
    { id: 1, image: "/Images/commodity1.jpg" },
    { id: 2, image: "/Images/commodity2.jpg" },
    { id: 3, image: "/Images/commodity3.jpg" }
  ];

  return (
    <Container>
      <ProductSlider>
        {items.map((item, index) => (
          <ProductWrapper 
            key={item.id} 
            style={{"--i": index}}
          >
            <ProductImage 
              src={item.image} 
              alt={`Product ${item.id}`} 
            />
          </ProductWrapper>
        ))}
      </ProductSlider>
    </Container>
  );
};

export default Commodity;