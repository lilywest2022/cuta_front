import React, { useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import i18n from './i18n';
import Home from './pages/Home';
import Purch from './pages/Purch';

function App() {
  const [language, setLanguage] = useState('cn');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className={language === 'en' ? 'en' : 'cn'}>
          <Routes>
            <Route path="/" element={<Home changeLanguage={changeLanguage} />} />
            <Route path="/Purch" element={<Purch />} />
          </Routes>
        </div>
      </Router>
    </I18nextProvider>
  );
}

export default App;
