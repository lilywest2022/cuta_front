import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight - 80
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight - 80
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    indexAbout: {
      position: 'relative',
      backgroundColor: 'black',
      margin: '-4px 0 0 0',  // 负边距消除间隙
      padding: 0,
      display: 'block'
    },
    mfbox: {
      width: '100%',
      position: 'relative',
      display: 'block'
    },
    video: {
      width: '100%',
      height: `${windowSize.height}px`,
      objectFit: 'cover',
      display: 'block',  // 确保块级显示
      verticalAlign: 'top'  // 移除图片底部间隙
    },
    contentOverlay: {
      width: '100%',
      textAlign: 'center',
      color: 'white',
      padding: `${windowSize.height * 0.05}px 0`,
      backgroundColor: 'black'
    },
    mainTitle: {
      fontSize: `${windowSize.width * 0.05}px`,
      fontWeight: 'bold',
      marginBottom: `${windowSize.height * 0.03}px`,
      whiteSpace: 'nowrap'
    },
    featuresContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0px',
      flexWrap: 'wrap'
    },
    featureItem: {
      fontSize: `${windowSize.width * 0.03}px`,
      padding: `0 ${windowSize.width * 0.01}px`
    }
  };

  return (
    <div className="index_about" style={styles.indexAbout}>
      <div className="mfbox" style={styles.mfbox}>
        <video 
          style={styles.video}
          autoPlay 
          muted 
          loop 
          poster="./Images/about.png" 
          controls
        >
          <source src="https://testcuta1.no29.cuttle.com.cn/1.mp4" type="video/mp4" />
        </video>
        
        <div style={styles.contentOverlay}>
          <h1 style={styles.mainTitle}>{t('gameSection.mainTitle')}</h1>
          <div style={styles.featuresContainer}>
            {t('gameSection.features', { returnObjects: true }).map((feature, index) => (
              <span key={index} style={styles.featureItem}>
                {feature}
                {index < t('gameSection.features', { returnObjects: true }).length - 1 ? '，' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
