import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  en: {
    translation: {
      profile: 'Profile',
      details: 'Details',
      history: 'History',
      dateTime: 'Date/Time',
      fuel: 'Fuel',
      position: 'Position',
      password: 'Password',
    },
  },
  es: {
    translation: {
      profile: 'Perfil',
      details: 'Detalles',
      history: 'Historial',
      dateTime: 'Fecha/Hora',
      fuel: 'Combustible',
      position: 'Posición',
      password: 'Contraseña',
    },
  },
  pt: {
    translation: {
      profile: 'Perfil',
      details: 'Detalhes',
      history: 'Histórico',
      dateTime: 'Data/Hora',
      fuel: 'Combustível',
      position: 'Posição',
      password: 'Senha',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
