import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

// Recursos de tradução
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
      invalidEmail: 'Invalid email',
      requiredField: 'Required field',
      error: 'Error',
      authTokenNotFound: 'Authentication token not found. Please log in again.',
      unableToLoadVehicles: 'Unable to load vehicles.',
      unableToLoadVehicleHistory: 'Unable to load vehicle history.',
      invalidCredentials: 'Invalid username or password!',
      genericError:
        'Oops! We encountered a problem. Please try again and, if the error persists, contact our support. (Error {{status}})',
      timeoutError:
        'The request took too long to respond. Please try again. (Error 504)',
      unknownError: 'An unknown error occurred. Please try again.',
      profileFetchError: 'Error retrieving user profile. (Error {{status}})',
      unknownProfileError:
        'An unknown error occurred while retrieving the profile. Please try again.',
      fetchVehiclesError: 'Error fetching vehicles: {{status}}',
      fetchVehiclesErrorGeneric: 'Error fetching vehicles',
      fetchVehicleHistoryError: 'Error fetching vehicle history: {{status}}',
      fetchVehicleHistoryErrorGeneric: 'Error fetching vehicle history',
      email: 'E-mail',
      login: 'Login',
      aboutThisApp: 'About this app',
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
      invalidEmail: 'Correo electrónico inválido',
      requiredField: 'Campo obligatorio',
      error: 'Error',
      authTokenNotFound:
        'Token de autenticación no encontrado. Por favor, inicie sesión nuevamente.',
      unableToLoadVehicles: 'No se pudo cargar los vehículos.',
      unableToLoadVehicleHistory:
        'No se pudo cargar el historial del vehículo.',
      invalidCredentials: '¡Usuario o contraseña inválidos!',
      genericError:
        '¡Ups! Encontramos un problema. Intenta de nuevo y, si el error persiste, contacta a nuestro soporte. (Error {{status}})',
      timeoutError:
        'La solicitud tardó demasiado en responder. Intenta de nuevo. (Error 504)',
      unknownError: 'Ocurrió un error desconocido. Intenta de nuevo.',
      profileFetchError:
        'Error al obtener el perfil del usuario. (Error {{status}})',
      unknownProfileError:
        'Ocurrió un error desconocido al obtener el perfil. Intenta de nuevo.',
      fetchVehiclesError: 'Error al buscar vehículos: {{status}}',
      fetchVehiclesErrorGeneric: 'Error al buscar vehículos',
      fetchVehicleHistoryError:
        'Error al buscar el historial del vehículo: {{status}}',
      fetchVehicleHistoryErrorGeneric:
        'Error al buscar el historial del vehículo',
      email: 'E-mail',
      login: 'Login',
      aboutThisApp: 'Acerca de esta aplicación',
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
      invalidEmail: 'Email inválido',
      requiredField: 'Campo obrigatório',
      error: 'Erro',
      authTokenNotFound:
        'Token de autenticação não encontrado. Por favor, faça login novamente.',
      unableToLoadVehicles: 'Não foi possível carregar os veículos.',
      unableToLoadVehicleHistory:
        'Não foi possível carregar o histórico do veículo.',
      invalidCredentials: 'Usuário ou senha inválidos!',
      genericError:
        'Ops! Encontramos um problema. Tente novamente e se o erro persistir contate nosso suporte. (Erro {{status}})',
      timeoutError:
        'A requisição demorou muito para responder. Tente novamente. (Erro 504)',
      unknownError: 'Ocorreu um erro desconhecido. Tente novamente.',
      profileFetchError: 'Erro ao obter o perfil do usuário. (Erro {{status}})',
      unknownProfileError:
        'Ocorreu um erro desconhecido ao obter o perfil. Tente novamente.',
      fetchVehiclesError: 'Erro ao buscar veículos: {{status}}',
      fetchVehiclesErrorGeneric: 'Erro ao buscar veículos',
      fetchVehicleHistoryError:
        'Erro ao buscar o histórico do veículo: {{status}}',
      fetchVehicleHistoryErrorGeneric: 'Erro ao buscar o histórico do veículo',
      email: 'E-mail',
      login: 'Login',
      aboutThisApp: 'Sobre este app',
    },
  },
};

// Função para detectar o idioma do dispositivo
const getLanguage = () => {
  const locales = RNLocalize.getLocales();
  if (locales.length > 0) {
    const languageTag = locales[0].languageCode; // Obtém o código do idioma (ex: 'en', 'es', 'pt')
    return languageTag;
  }
  return 'en'; // Fallback para inglês se não for possível determinar o idioma
};

i18n.use(initReactI18next).init({
  resources,
  lng: getLanguage(), // Detecta e define a língua do dispositivo
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
