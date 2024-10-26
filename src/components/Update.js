import React from 'react';
import styled from 'styled-components';

const UpdateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // 水平居中
  width: 100%;
`;

const ResponsiveImage = styled.img`
  max-width: 100%;   // 自适应宽度
  height: auto;      // 保持高度比例
  margin-bottom: 20px; // 图片与视频之间的间距
`;

const Video = styled.video`
  width: 100%;
  height: 100vh;
  object-fit: cover;
`;

function Update() {
  return (
    <UpdateContainer>
      <a href="./Images/index_Update_cn.jpg" target="_blank">
        <ResponsiveImage src="./Images/index_Update_cn.jpg" alt="" />
      </a>
      <Video 
        autoPlay 
        muted 
        loop 
        poster="./Images/index_Update2.jpg" 
        controls
      >
        <source src="https://testcuta1.no29.cuttle.com.cn/2.mp4" type="video/mp4" />
      </Video>
    </UpdateContainer>
  );
}

export default Update;
