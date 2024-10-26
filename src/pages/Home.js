import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import About from '../components/About';
import Features from '../components/Features';
import Features2 from '../components/Features2';
import Update from '../components/Update';
import Hardware from '../components/Hardware';
import Footer from '../components/Footer';
import Purchase from '../components/Purchase';
import GameWindow from '../components/GameWindow';
import FAQ from '../components/FAQ';  
import { useTranslation } from 'react-i18next';


function Home({ changeLanguage }) {
  const { t } = useTranslation();

  return (
    <>
      <Header changeLanguage={changeLanguage} />
      <Banner />
      <About />
      <Features />
      <Features2 />
      <Update />
      <Hardware />
      <Purchase />
      <GameWindow />
      <FAQ />
      <Footer />
    </>
  );
}

export default Home;