import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  en: {
    translation: {
      profile: 'Profile',
    },
  },
  es: {
    translation: {
      profile: 'Perfil',
    },
  },
  pt: {
    translation: {
      profile: 'Perfil',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt', // idioma padrão
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
