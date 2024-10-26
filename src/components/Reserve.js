import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ReserveContainer = styled.div`
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

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
`;

const ResponsiveImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const CountdownOverlay = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
`;

const PreOrderText = styled.div`
  color: white;
  font-size: clamp(16px, 3vw, 24px);
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: clamp(10px, 2vw, 20px);
  margin: 0 auto;
  max-width: 90%;
`;

const TimeUnit = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: clamp(8px, 1.5vw, 15px);
  border-radius: 8px;
  min-width: clamp(50px, 8vw, 80px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    min-width: 40px;
    padding: 6px;
  }
`;

const Number = styled.div`
  font-size: clamp(20px, 4vw, 36px);
  font-weight: bold;
  color: black;
  line-height: 1.2;
`;

const Label = styled.div`
  font-size: clamp(10px, 1.5vw, 14px);
  color: #666;
  text-transform: uppercase;
  margin-top: 4px;
`;

const Reserve = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2024-11-10T00:00:00');
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ReserveContainer>
      <ImageContainer>
        <ResponsiveImage src="/Images/purchase1.png" alt="CUMA Device" />
        <CountdownOverlay>
          <PreOrderText>PRE-ORDER OPENS IN</PreOrderText>
          <CountdownContainer>
            <TimeUnit>
              <Number>{String(timeLeft.days).padStart(2, '0')}</Number>
              <Label>DAYS</Label>
            </TimeUnit>
            <TimeUnit>
              <Number>{String(timeLeft.hours).padStart(2, '0')}</Number>
              <Label>HOURS</Label>
            </TimeUnit>
            <TimeUnit>
              <Number>{String(timeLeft.minutes).padStart(2, '0')}</Number>
              <Label>MINS</Label>
            </TimeUnit>
            <TimeUnit>
              <Number>{String(timeLeft.seconds).padStart(2, '0')}</Number>
              <Label>SECS</Label>
            </TimeUnit>
          </CountdownContainer>
        </CountdownOverlay>
      </ImageContainer>
    </ReserveContainer>
  );
};

export default Reserve;
