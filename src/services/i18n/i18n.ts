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
      aboutScreenDescriptionPt1: `
VehicleLookupApp is an app created by Luan Fabbri. It aims to serve as a portfolio and demonstrate the following capabilities:

- Login capabilities - Forms, libraries like Yup and Formik, handling sessions (login and logout).
- Componentization of an app.
- React-Navigation.
- API consumption (Axios).
- Basic backend.
- Use of Redux.
- Use of i18n.
- Use of Google Geolocation API and GoogleMaps implementation.
- Flexbox layout.
- Folder structure.
- Git (Version control, branches, etc).
- Fonts (installation and management).
- Light/Dark mode.
      `,
      aboutScreenThanks: `
Thank you for your interest in reading this far. If you would like to have a conversation with me about joining your development team, my LinkedIn is `,
      aboutScreenDescriptionPt2: `
The app is currently at version v1.2, and version v1.3 has some new features planned:

- Skeletons.
- Automatic Login with token.
- Even more componentization.
- Example of internal and external notifications.
- Firebase and the possibility of logging in with Google/Facebook!
      `,
      createdBy: 'Created by Luan Fabbri',
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
      aboutScreenDescriptionPt1: `
VehicleLookupApp es una aplicación creada por Luan Fabbri. Tiene como objetivo servir como portafolio y ejemplificar las siguientes capacidades:

- Capacidades de inicio de sesión - Formularios, bibliotecas como Yup y Formik, manejo de sesiones (inicio de sesión y cierre de sesión).
- Componentización de una aplicación.
- React-Navigation.
- Consumo de API (Axios).
- Backend básico.
- Uso de Redux.
- Uso de i18n.
- Uso de la API de Geolocalización de Google e implementación de GoogleMaps.
- Diseño con Flexbox.
- Estructura de carpetas.
- Git (control de versiones, ramas, etc).
- Fuentes (instalación y gestión).
- Modo claro/oscuro.
      `,
      aboutScreenThanks: `
¡Gracias por tu interés en leer hasta aquí! Si deseas conversar conmigo sobre unirte a tu equipo de desarrollo, mi LinkedIn es `,
      aboutScreenDescriptionPt2: `
Actualmente, la aplicación está en la versión v1.2, y la versión v1.3 tiene algunas nuevas funcionalidades planificadas:

- Skeletons.
- Inicio de sesión automático con token.
- Aún más componentización.
- Ejemplo de notificaciones internas y externas.
- Firebase y la posibilidad de iniciar sesión con Google/Facebook.
      `,
      createdBy: 'Creado por Luan Fabbri',
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
      aboutScreenDescriptionPt1: `
VehicleLookupApp é um aplicativo criado por mim, Luan Fabbri. Tem como objetivo servir como portfólio e exemplificar as seguintes capacidades:

- Capacidades de Login - Formulários, bibliotecas como Yup e Formik, gerenciamento de sessões (login e logout).
- Componentização de um aplicativo.
- React-Navigation.
- Consumo de APIs (Axios).
- Backend básico.
- Uso de Redux.
- Uso de i18n.
- Uso da API de geolocalização do Google e implementação do GoogleMaps.
- Layout com Flexbox.
- Estrutura de pastas.
- Git (controle de versão, branches, etc).
- Fontes (instalação e administração).
- Modo claro/escuro.
      `,
      aboutScreenThanks: `
Obrigado por dedicar seu tempo para conhecer mais sobre este projeto. Se estiver interessado em discutir uma possível colaboração ou deseja me adicionar à sua equipe de desenvolvimento, sinta-se à vontade para entrar em contato comigo pelo meu `,
      aboutScreenDescriptionPt2: `
Atualmente, o aplicativo está na versão v1.2, e a versão v1.3 tem algumas novas funcionalidades planejadas:

- Skeletons.
- Login Automático com token.
- Ainda mais componentização.
- Exemplo de notificações internas e externas.
- Firebase e a possibilidade de login com Google/Facebook.
`,
      createdBy: 'Criado por Luan Fabbri',
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
