import React, { useState } from 'react';
import styled from 'styled-components';

const FAQContainer = styled.div`
  width: 100vw; // 修改：使用视窗宽度
  min-height: 100vh; // 添加：确保至少占满整个视窗高度
  margin: 0; // 移除自动边距
  padding: 40px 20px; // 调整内边距
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box; // 确保padding不会导致溢出
  position: relative; // 添加相对定位
  left: 50%; // 配合transform使用
  right: 50%;
  margin-left: -50vw; // 使容器占据整个视窗宽度
  margin-right: -50vw;
  
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const FAQContent = styled.div`
  width: 100%;
  max-width: 1200px; // 内容区域最大宽度
  margin: 0 auto;
`;

const FAQTitle = styled.h2`
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: clamp(24px, 5vw, 32px); // 使用clamp实现响应式字体
  margin-bottom: clamp(20px, 5vh, 40px);
  padding: 0 20px;
`;

const FAQItem = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: clamp(15px, 3vh, 20px);
  padding: 0 20px;
  box-sizing: border-box;
`;

const Question = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #8B8BCD;
  font-size: clamp(16px, 3vw, 20px);
  padding: clamp(10px, 2vh, 15px) 0;
  cursor: pointer;
  
  @media (max-width: 768px) {
    padding: 12px 0;
  }
`;

const PlusIcon = styled.span`
  color: #8B8BCD;
  font-size: clamp(20px, 4vw, 24px);
  transform: ${props => props.isOpen ? 'rotate(45deg)' : 'rotate(0)'};
  transition: transform 0.3s ease;
  min-width: clamp(20px, 4vw, 24px);
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Answer = styled.div`
  width: 100%;
  color: #fff;
  padding: clamp(10px, 2vh, 15px) 0;
  display: ${props => props.isOpen ? 'block' : 'none'};
  line-height: 1.6;
  font-size: clamp(14px, 2.5vw, 16px);
`;

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const faqData = [
    {
      question: "What is SuiPlay0X1?",
      answer: "Your answer text here"
    },
    {
      question: "Is the SuiPlay0X1 built to be customizable?",
      answer: "Your answer text here"
    },
    {
      question: "When will the SuiPlay0X1 be available?",
      answer: "Your answer text here"
    },
    {
      question: "What games and marketplaces will the SuiPlay0X1 have access to?",
      answer: "Your answer text here"
    }
  ];

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <FAQContainer>
      <FAQContent>
        <FAQTitle>FAQ</FAQTitle>
        {faqData.map((item, index) => (
          <FAQItem key={index}>
            <Question onClick={() => toggleItem(index)}>
              {item.question}
              <PlusIcon isOpen={openItems[index]}>+</PlusIcon>
            </Question>
            <Answer isOpen={openItems[index]}>
              {item.answer}
            </Answer>
          </FAQItem>
        ))}
      </FAQContent>
    </FAQContainer>
  );
};

export default FAQ;
