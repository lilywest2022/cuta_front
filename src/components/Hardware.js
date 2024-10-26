import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const HardwareContainer = styled.div`
  text-align: center;
  padding: 60px 20px;
`;

const MfBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const HardwareList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  gap: 120px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const HardwareItem = styled.li`
  text-align: center;
  width: 400px;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  h3 {
    font-size: 2rem;
    margin: 15px 0;
    font-weight: bold;
  }
  
  p {
    font-size: 1.3rem;
    line-height: 1.6;
    margin: 0; // 移除左右边距
  }
`;

const PicImage = styled.img`
  width: 250px; // 修改宽度为200px
  height: auto;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; // 确保标题和描述占满宽度
  margin-top: 20px; // 添加顶部边距以确保一致性
`;

function Hardware() {
  const { t } = useTranslation();

  const formatDescription = (description) => {
    return description.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <HardwareContainer>
      <MfBox>
        <HardwareList>
          <HardwareItem>
            <PicImage src="./Images/hardware1.png" alt="" />
            <TitleContainer>
              <h3>{t('hardware.SD.title')}</h3>
              <p>{formatDescription(t('hardware.SD.description'))}</p>
            </TitleContainer>
          </HardwareItem>
          <HardwareItem>
            <PicImage src="./Images/hardware2.png" alt="" />
            <TitleContainer>
              <h3>{t('hardware.HD.title')}</h3>
              <p>{formatDescription(t('hardware.HD.description'))}</p>
            </TitleContainer>
          </HardwareItem>
          <HardwareItem>
            <PicImage src="./Images/hardware3.png" alt="" />
            <TitleContainer>
              <h3>{t('hardware.POWER.title')}</h3>
              <p>{formatDescription(t('hardware.POWER.description'))}</p>
            </TitleContainer>
          </HardwareItem>
          <HardwareItem>
            <PicImage src="./Images/hardware4.png" alt="" />
            <TitleContainer>
              <h3>{t('hardware.USEFUL.title')}</h3>
              <p>{formatDescription(t('hardware.USEFUL.description'))}</p>
            </TitleContainer>
          </HardwareItem>
        </HardwareList>
      </MfBox>
    </HardwareContainer>
  );
}

export default Hardware;
