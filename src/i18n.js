import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          gameSection: {
            mainTitle: "Play and Earn, Anytime, Anywhere",
            features: [
              "Powerful Features",
              "Comfortable Control",
              "Portable Design",
              "Long-term Returns"
            ]
          },
          features: {
            os: {
              title: "Operating System",
              description: "Advanced operating system optimized for gaming and digital asset management"
            },
            wallet: {
              title: "Digital Wallet",
              description: "Secure and easy-to-use digital wallet for managing your assets"
            },
            game: {
              title: "Gaming Platform",
              description: "Access to a wide variety of games and entertainment options"
            },
            reward: {
              title: "Rewards System",
              description: "Earn rewards through gameplay and community participation"
            },
            security: {
              title: "Security",
              description: "Advanced security measures to protect your assets and data"
            },
            support: {
              title: "24/7 Support",
              description: "Round-the-clock customer support for all your needs"
            },
            community: {
              title: "Community",
              description: "Join a vibrant community of gamers and enthusiasts"
            },
            market: {
              title: "Marketplace",
              description: "Trade and exchange digital assets in our secure marketplace"
            }
          },
          features2:{
            user:{
              title:"Handheld Device Account Binding Platform to Ensure User Authenticity"
            },
            message:{
              title:"Genuine User Rating System to Highlight Quality Blockchain Games"
            },
            wallet:{
              title:"AI-Driven Analysis of Blockchain Game Trends for Optimal User Returns"
            },
            reward:{
              title:"Annual Blockchain Game Awards, Voted by Users to Recognize the Best Games"
            },
            compelete:{
              title:"Blockchain Game Esports Competitions to Promote Web3 Professional Events"
            }
          },
          hardware:{
            SD:{
              title:"Large Capacity",
              description:"8G + 256G\nTF Card Support up to 1TB"
            },
            HD:{
              title:"High Definition Screen",
              description:"LCD 4K 5.5inch\nResolution 3840*2160"
            },
            POWER:{
              title:"High Performance",
              description:"Qualcomm Snapdragon XR2"
            },
            USEFUL:{
              title:"Ultra-Portable",
              description:"Magnetic Detachable Controllers\n225*89*14.25mm\nMain Unit 251g, Controllers 116g"
            }
          }

        }
      },
      cn: {
        translation: {
          gameSection: {
            mainTitle: "随时随地，边玩边赚钱",
            features: [
              "功能强大",
              "操控舒适",
              "方便携带",
              "收益长期"
            ]
          },
          features: {
            os: {
              title: "操作系统",
              description: "针对游戏和数字资产管理优化的先进操作系统"
            },
            wallet: {
              title: "数字钱包",
              description: "安全易用的数字资产管理钱包"
            },
            game: {
              title: "游戏平台",
              description: "提供丰富多样的游戏和娱乐选择"
            },
            reward: {
              title: "奖励系统",
              description: "通过游戏和社区参与获得奖励"
            },
            security: {
              title: "安全保障",
              description: "先进的安全措施保护您的资产和数据"
            },
            support: {
              title: "全天候支持",
              description: "24小时随时为您提供客户支持服务"
            },
            community: {
              title: "社区互动",
              description: "加入充满活力的游戏玩家社区"
            },
            market: {
              title: "交易市场",
              description: "在安全的市场中交易和交换数字资产"
            }
          },
          features2:{
            user:{
              title:"掌机账号绑定平台,确保用户的真实性"
            },
            message:{
              title:"真实用户评分体系,让优质链游脱颖而出"
            },
            wallet:{
              title:"AI分析链游走势,用户收益的良好保障"
            },
            reward:{
              title:"举办年度链游评比,由用户评选最佳链游"
            },
            compelete:{
              title:"举办链游电竞比赛,推动Web3职业赛事"
            }
          },
          hardware:{
            SD:{
              title:"大容量",
              description:"8G + 256G\nTF卡支持1T"
            },
            HD:{
              title:"高清屏",
              description:"LCD 4K 5.5inch\n分辨率3840*2160"
            },
            POWER:{
              title:"高性能",
              description:"Qualcomm Snapdragon XR2"
            },
            USEFUL:{
              title:"超便携",
              description:"手柄磁吸附，可拆卸\n225*89*14.25mm\n主体251g，手柄116g"
            }
          }
        }
      }
    },
    lng: "cn",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
