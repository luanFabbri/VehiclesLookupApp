import {useDispatch} from 'react-redux';
import {setToken} from '../redux/slices/authSlice';
import {Login, Profile} from '../types/loginInterfaces';
import {Vehicle, VehicleHistory} from '../types/VehicleInterfaces';
import {SERVER_IP} from '@env';

// Função para realizar o login e retornar o id_token
export const login = async (
  values: {email: string; password: string},
  dispatch: any,
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  console.log('email: ', values.email, ' pass: ', values.password);

  try {
    const response = await fetch(`http://${SERVER_IP}:3000/login`, {
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
      return {status: 'error', message: 'Usuário ou senha inválidos!'};
    } else if (response.status === 500 || response.status === 504) {
      return {
        status: 'error',
        message: `Ops! Encontramos um problema. Tente novamente e se o erro persistir contate nosso suporte. (Erro ${response.status})`,
      };
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return {
        status: 'error',
        message: 'A requisição demorou muito para responder. Tente novamente.',
      };
    }
    console.log(error);
    return {
      status: 'error',
      message: 'Ocorreu um erro desconhecido. Tente novamente.',
    };
  }
};

// Função para obter o perfil do usuário
export const getProfile = async (token: string) => {
  try {
    const response = await fetch(`http://${SERVER_IP}:3000/profile`, {
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
        message: `Erro ao obter o perfil do usuário. (Erro ${response.status})`,
      };
    }
  } catch (error) {
    return {
      status: 'error',
      message:
        'Ocorreu um erro desconhecido ao obter o perfil. Tente novamente.',
    };
  }
};

export const fetchVehicles = async (token: string) => {
  try {
    const response = await fetch(`http://${SERVER_IP}:3000/vehicles`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data: Vehicle[] = await response.json();
      return data;
    } else {
      throw new Error(`Erro ao buscar veículos: ${response.status}`);
    }
  } catch (error) {
    throw new Error('Erro ao buscar veículos');
  }
};

export const fetchVehicleHistory = async (token: string) => {
  try {
    const response = await fetch(`http://${SERVER_IP}:3000/vehicles/history`, {
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
        `Erro ao buscar o histórico do veículo: ${response.status}`,
      );
    }
  } catch (error) {
    throw new Error('Erro ao buscar o histórico do veículo');
  }
};
