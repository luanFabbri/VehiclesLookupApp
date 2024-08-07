// src/services/api-config.ts
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {setToken, setProfile} from '../redux/slices/authSlice';

// Função para realizar o login e retornar o id_token
export const login = async (values: {email: string; password: string}) => {
  const dispatch = useDispatch();

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values),
    });

    if (response.status === 200) {
      const data = await response.json();
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
  } catch (error) {
    return {
      status: 'error',
      message: 'Ocorreu um erro desconhecido. Tente novamente.',
    };
  }
};

// Função para obter o perfil do usuário
export const getProfile = async (token: string) => {
  try {
    const response = await fetch('http://localhost:3000/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
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
    const response = await fetch('http://localhost:3000/vehicles', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Erro ao buscar veículos: ${response.status}`);
    }
  } catch (error) {
    throw new Error('Erro ao buscar veículos');
  }
};
