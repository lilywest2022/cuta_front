import React from 'react';
import { useTranslation } from 'react-i18next';

function Features() {
  const { t } = useTranslation();

  const styles = {
    container: {
      backgroundColor: '#2A2A2A',
      padding: '180px 0'
    },
    mfbox: {
      width: '90%',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    featureGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '40px',
      justifyContent: 'center'
    },
    featureItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '40px',
      backgroundColor: '#111111',
      borderRadius: '12px',
      border: '1px solid #333',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    iconContainer: {
      width: '120px',
      height: '120px',
      marginBottom: '20px',
      padding: '20px',
      backgroundColor: '#1A1A1A',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    icon: {
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    },
    title: {
      color: 'white',
      fontSize: '24px',
      marginBottom: '15px'
    },
    description: {
      color: '#888',
      fontSize: '16px',
      lineHeight: '1.5'
    }
  };

  const features = [
    {
      icon: './Images/Features1.png',
      title: t('features.os.title'),
      description: t('features.os.description')
    },
    {
      icon: './Images/Features2.png',
      title: t('features.wallet.title'),
      description: t('features.wallet.description')
    },
    {
      icon: './Images/Features3.png',
      title: t('features.game.title'),
      description: t('features.game.description')
    },
    {
      icon: './Images/Features4.png',
      title: t('features.reward.title'),
      description: t('features.reward.description')
    },
    {
      icon: './Images/Features5.png',
      title: t('features.security.title'),
      description: t('features.security.description')
    },
    {
      icon: './Images/Features6.png',
      title: t('features.support.title'),
      description: t('features.support.description')
    },
    {
      icon: './Images/Features7.png',
      title: t('features.community.title'),
      description: t('features.community.description')
    },
    {
      icon: './Images/Features8.png',
      title: t('features.market.title'),
      description: t('features.market.description')
    }
    // 可以继续添加更多特性
  ];

  return (
    <div style={styles.container}>
      <div style={styles.mfbox}>
        <div style={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} style={styles.featureItem}>
              <div style={styles.iconContainer}>
                <img 
                  src={feature.icon} 
                  alt={feature.title}
                  style={styles.icon}
                />
              </div>
              <h3 style={styles.title}>{feature.title}</h3>
              <p style={styles.description}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
