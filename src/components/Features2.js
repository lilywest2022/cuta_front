import React from 'react';
import { useTranslation } from 'react-i18next';

function Features2() {
  const { t } = useTranslation();

  const styles = {
    container: {
      backgroundColor: '#0D0F2D',
      padding: '80px 0',
      color: 'white'
    },
    mfbox: {
      width: '90%',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '60px'
    },
    logoImage: {
      height: '80px',
      marginRight: '15px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)', // 将每个框的宽度设置为相同
      gap: '20px',
      gridTemplateRows: 'auto'
    },
    card: {
      backgroundColor: '#151A4E',
      borderRadius: '15px',
      padding: '30px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    },
    largeCard: {
      gridRow: 'span 2'
    },
    icon: {
      width: '100px', // 增大宽度
      height: '100px', // 增大高度
      marginBottom: '20px'
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    description: {
      fontSize: '16px',
      color: '#8888AA'
    }
  };

  const features = [
    {
      icon: './Images/Features2_1.png',
      title:t('features2.user.title'),
      large:true
    },
    {
      icon: './Images/Features2_2.png',
      title:t('features2.message.title'),
      large:true

    },
    {
      icon: './Images/Features2_3.png',
      title:t('features2.wallet.title'),
      large:true

    },
    {
      icon: './Images/Features2_4.png',
      title:t('features2.reward.title'),
      large:true

    },
    {
      icon: './Images/Features2_5.png',
      title:t('features2.compelete.title'),
      large:true

    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.mfbox}>
        <div style={styles.logo}>
          <img src="./Images/Features_logo.png" alt="CUTA GAMES" style={styles.logoImage} />
          <h2>链游精选平台</h2>
        </div>
        
        <div style={styles.grid}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              style={{
                ...styles.card,
                ...(feature.large ? styles.largeCard : {})
              }}
            >
              <img src={feature.icon} alt={feature.title} style={styles.icon} />
              <h3 style={styles.title}>{feature.title}</h3>
              <p style={styles.description}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features2;
