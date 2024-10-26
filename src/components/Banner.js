import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

const BannerWrapper = styled.div`
  width: 100%;
  margin-top: 80px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;  // 改为 cover 确保图片填充整个容器
    display: block;     // 防止图片底部间隙
  }

  .swiper {
    width: 100%;
  }

  .swiper-slide {
    width: 100%;
  }
`;

function Banner() {
  return (
    <BannerWrapper>
      <Swiper>
        <SwiperSlide>
          <img 
            src="/Images/banner_cn.jpg" 
            alt="Banner" 
          />
        </SwiperSlide>
      </Swiper>
    </BannerWrapper>
  );
}

export default Banner;
