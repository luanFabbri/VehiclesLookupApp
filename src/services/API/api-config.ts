// Imports de Redux
import {setToken} from '@services/redux/slices/authSlice';

// Imports de Interfaces
import {Vehicle, VehicleHistory} from '@interfaces/VehicleInterfaces';
import {Login, Profile} from '@interfaces/LoginInterfaces';

// Imports de Variáveis de Ambiente
import {API_URL} from '@env';

// Importando i18n para traduções
import {t} from 'i18next';

// Importando axios
import axios from 'axios';

// Configurando instância do axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 6000, // Timeout global para todas as requisições
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para realizar o login e retornar o id_token
export const login = async (
  values: {email: string; password: string},
  dispatch: any,
) => {
  try {
    const response = await api.post('/login', values);

    if (response.status === 200) {
      const data: Login = response.data;
      dispatch(setToken(data.id_token));
      return {status: 'success', data: data.id_token};
    } else if (response.status === 401) {
      return {status: 'error', message: t('invalidCredentials')};
    }
  } catch (error: any) {
    if (error.code === 'ECONNABORTED') {
      return {status: 'error', message: t('timeout')};
    } else if (error.response) {
      const status = error.response.status;
      if (status === 500 || status === 504) {
        return {status: 'error', message: t('serverError', {status})};
      }
    }
    console.log(error);
    return {status: 'error', message: t('unknownError')};
  }
};

// Função para obter o perfil do usuário
export const getProfile = async (token: string) => {
  try {
    const response = await api.get('/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const data: Profile = response.data;
      return {status: 'success', data: data};
    } else {
      return {
        status: 'error',
        message: t('getProfile', {status: response.status}),
      };
    }
  } catch (error) {
    return {status: 'error', message: t('unknownErrorProfile')};
  }
};

// Função para obter os veículos
export const fetchVehicles = async (token: string) => {
  try {
    const response = await api.get('/vehicles', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const data: Vehicle[] = response.data;
      return data;
    } else {
      throw new Error(t('fetchVehicles', {status: response.status}));
    }
  } catch (error) {
    throw new Error(t('fetchVehiclesGeneric'));
  }
};

// Função para obter o histórico dos veículos
export const fetchVehicleHistory = async (token: string) => {
  try {
    const response = await api.get('/vehicles/history', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const data: VehicleHistory[] = response.data;
      return data;
    } else {
      throw new Error(t('fetchVehicleHistory', {status: response.status}));
    }
  } catch (error) {
    throw new Error(t('fetchVehicleHistoryGeneric'));
  }
};
