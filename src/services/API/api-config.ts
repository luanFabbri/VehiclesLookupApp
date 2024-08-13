// Imports de Redux
import {setToken} from '@redux/slices/authSlice';

// Imports de Interfaces
import {Vehicle, VehicleHistory} from '@interfaces/VehicleInterfaces';
import {Login, Profile} from '@interfaces/LoginInterfaces';

// Imports de Variáveis de Ambiente
import {API_URL} from '@env';

// Importando i18n para traduções
import {t} from 'i18next';

// Função para realizar o login e retornar o id_token
export const login = async (
  values: {email: string; password: string},
  dispatch: any,
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.status === 200) {
      const data: Login = await response.json();
      dispatch(setToken(data.id_token));
      return {status: 'success', data: data.id_token};
    } else if (response.status === 401) {
      return {status: 'error', message: t('errors.invalidCredentials')};
    } else if (response.status === 500 || response.status === 504) {
      return {
        status: 'error',
        message: t('errors.serverError', {status: response.status}),
      };
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return {
        status: 'error',
        message: t('errors.timeout'),
      };
    }
    console.log(error);
    return {
      status: 'error',
      message: t('errors.unknownError'),
    };
  }
};

// Função para obter o perfil do usuário
export const getProfile = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const data: Profile = await response.json();
      return {status: 'success', data: data};
    } else {
      return {
        status: 'error',
        message: t('errors.getProfile', {status: response.status}),
      };
    }
  } catch (error) {
    return {
      status: 'error',
      message: t('errors.unknownErrorProfile'),
    };
  }
};

// Função para obter os veículos
export const fetchVehicles = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/vehicles`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data: Vehicle[] = await response.json();
      return data;
    } else {
      throw new Error(t('errors.fetchVehicles', {status: response.status}));
    }
  } catch (error) {
    throw new Error(t('errors.fetchVehiclesGeneric'));
  }
};

// Função para obter o histórico dos veículos
export const fetchVehicleHistory = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/vehicles/history`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data: VehicleHistory[] = await response.json();
      return data;
    } else {
      throw new Error(
        t('errors.fetchVehicleHistory', {status: response.status}),
      );
    }
  } catch (error) {
    throw new Error(t('errors.fetchVehicleHistoryGeneric'));
  }
};
