import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import pt from './locales/pt.json';
import es from './locales/es.json';

const resources = {
  en: en,
  pt: pt,
  es: es,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

describe('i18n translation tests', () => {
  test('should return the correct translation for en', () => {
    expect(i18n.t('profile')).toBe('Profile');
    expect(i18n.t('details')).toBe('Details');
  });

  test('should return the correct translation for pt', () => {
    i18n.changeLanguage('pt');
    expect(i18n.t('profile')).toBe('Perfil');
    expect(i18n.t('details')).toBe('Detalhes');
  });

  test('should return the correct translation for es', () => {
    i18n.changeLanguage('es');
    expect(i18n.t('profile')).toBe('Perfil');
    expect(i18n.t('details')).toBe('Detalles');
  });

  test('should fallback to en when the key is not found in the selected language', () => {
    i18n.changeLanguage('pt');
    expect(i18n.t('nonExistentKey')).toBe('nonExistentKey'); // Não existente em pt.json ou en.json
  });
});
