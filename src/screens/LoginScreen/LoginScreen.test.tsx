import React from 'react';
import {
  render,
  waitFor,
  fireEvent,
  userEvent,
} from '@testing-library/react-native';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import LoginScreen from './LoginScreen';
import {setToken, setProfile} from '@services/redux/slices/authSlice';
import {login as apiLogin, getProfile as apiGetProfile} from '@api/api-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuração do mock da store
const mockStore = configureStore([]);
const store = mockStore({
  auth: {
    token: null,
    profile: {},
  },
  settings: {
    darkMode: false,
  },
});

// Mock das funções e módulos
jest.mock('@services/redux/slices/authSlice', () => ({
  setToken: jest.fn(),
  setProfile: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    dispatch: jest.fn(),
  }),
}));

// Tipar as funções como jest.Mock
const login = apiLogin as jest.Mock;
const getProfile = apiGetProfile as jest.Mock;

jest.mock('@api/api-config', () => ({
  login: jest.fn(),
  getProfile: jest.fn(),
}));

jest.mock('@env', () => ({
  TOKEN: 'dummy-token',
}));

jest.mock('@services/i18n/i18n', () => ({
  t: jest.fn(key => key),
}));

describe('LoginScreen', () => {
  beforeEach(() => {
    // Limpa os mocks antes de cada teste
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    // Verifica se os elementos estão sendo renderizados corretamente
    expect(getByTestId('login-email-input')).toBeTruthy();
    expect(getByTestId('login-password-input')).toBeTruthy();
    expect(getByTestId('login-login-button')).toBeTruthy();
  });

  it('handles email and password input correctly', async () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    const emailInput = getByTestId('login-email-input');
    const passwordInput = getByTestId('login-password-input');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    await waitFor(() => {
      expect(emailInput.props.value).toBe('test@example.com');
      expect(passwordInput.props.value).toBe('password123');
    });
  });

  /*it('handles login button press', async () => {
    // Configura o mock para retornar valores específicos
    const handleSubmit = jest.fn();
    (login as jest.Mock).mockResolvedValue({
      status: 'success',
      data: 'fake-token',
    });
    (getProfile as jest.Mock).mockResolvedValue({
      status: 'success',
      data: {email: 'test@example.com', name: 'John Doe'},
    });

    const LoginScreenMock = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );
    const submitBtn = LoginScreenMock.getByTestId('login-login-button');
    console.log(submitBtn);
    userEvent.press(submitBtn);

    // Aguarda o armazenamento do token ser chamado
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        {email: 'test@example.com', password: 'password123'},
        expect.any(Function),
      );
      //   expect(AsyncStorage.setItem).toHaveBeenCalledWith('@token', 'fake-token');
      //   expect(store.getActions()).toContainEqual(setToken('fake-token'));
      //   expect(store.getActions()).toContainEqual(
      //     setProfile({email: 'test@example.com', name: 'John Doe'}),
      //   );
    });
  });*/
});
