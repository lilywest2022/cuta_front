import React from 'react';
import Header from '../components/Header';
import Reserve from '../components/Reserve';
import PrePayment from '../components/PrePayment';
import { useTranslation } from 'react-i18next';

function Purch({ changeLanguage }) {
  const { t } = useTranslation();
  return (
    <>
      <Header changeLanguage={changeLanguage} />
      <Reserve />
      <PrePayment />
    </>
  );
}
export default Purch;
