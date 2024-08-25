import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from './locales/en.json';
import es from './locales/es.json';
import pt from './locales/pt.json';

const resources = {
  en: en,
  es: es,
  pt: pt,
};

const getLanguage = () => {
  const locales = RNLocalize.getLocales();
  if (locales.length > 0) {
    return locales[0].languageCode;
  }
  return 'en';
};

i18n.use(initReactI18next).init({
  resources,
  lng: getLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
