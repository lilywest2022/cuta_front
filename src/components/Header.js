import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  width: 100%;
  height: 80px;
  background: #000000;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .mfbox {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
  }

  .logo {
    width: 120px;
    img {
      width: 100%;
      height: auto;
      filter: brightness(1.2);
    }
  }

  .languages {
    position: relative;
    
    .language_demo {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 8px;
      color: #ffffff;
      
      img {
        width: 24px;
        height: 24px;
        margin-right: 8px;
      }
      
      .down {
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #ffffff;
        margin-left: 5px;
      }
    }

    .hide_language {
      position: absolute;
      top: 100%;
      right: 0;
      background: rgba(0, 0, 0, 0.9);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      border-radius: 4px;
      padding: 8px 0;
      display: ${props => props.isOpen ? 'block' : 'none'};
      min-width: 120px;
      
      ul {
        list-style: none;
        
        li {
          a {
            display: flex;
            align-items: center;
            padding: 8px 16px;
            color: #ffffff;
            text-decoration: none;
            cursor: pointer;
            transition: background 0.3s ease;
            
            img {
              width: 20px;
              height: 20px;
              margin-right: 8px;
            }

            &:hover {
              background: rgba(255, 255, 255, 0.1);
            }
          }
        }
      }
    }
  }
`;

function Header({ changeLanguage }) {
  const { t } = useTranslation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsLanguageOpen(false);
  };

  return (
    <HeaderWrapper isOpen={isLanguageOpen}>
      <div className="mfbox">
        <div className="logo">
          <a href="/">
            <img src="/Images/logo_en.png" alt="CUTA Logo" />
          </a>
        </div>
        <div className="languages">
          <div className="language_demo" onClick={toggleLanguage}>
            <img src="/Images/language_demo.png" alt="Language" />
            <i className="down"></i>
          </div>
          <div className="hide_language">
            <ul>
              <li>
                <a onClick={() => handleLanguageChange('en')}>
                  <img src="/Images/en.png" alt="English" />English
                </a>
              </li>
              <li>
                <a onClick={() => handleLanguageChange('cn')}>
                  <img src="/Images/cn.png" alt="中文" />中文版
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </HeaderWrapper>
  );
}

export default Header;