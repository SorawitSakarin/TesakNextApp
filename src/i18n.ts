import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  react: {
    useSuspense: false,
  },
});

export default appWithTranslation;