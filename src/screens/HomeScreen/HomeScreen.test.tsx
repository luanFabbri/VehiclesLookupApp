import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Provider, useDispatch} from 'react-redux';
import configureStore from 'redux-mock-store';
import LoginScreen from '@screens/LoginScreen/LoginScreen';
import {setToken, setProfile} from '@services/redux/slices/authSlice';

// Mock do Redux store
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
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(fn =>
    fn({
      settings: {darkMode: false},
    }),
  ),
}));

jest.mock('@redux/actions', () => ({
  setToken: jest.fn(),
  setProfile: jest.fn(),
}));

describe('LoginScreen', () => {
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('renders correctly', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    expect(getByTestId('login-login-button')).toBeTruthy();
  });

  it('handles email and password input correctly', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    fireEvent.changeText(getByTestId('login-email-input'), 'test@example.com');
    fireEvent.changeText(getByTestId('login-password-input'), 'password123');

    expect(getByTestId('login-email-input').props.value).toBe(
      'test@example.com',
    );
    expect(getByTestId('login-password-input').props.value).toBe('password123');
  });

  it('handles login button press', async () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    fireEvent.changeText(getByTestId('login-email-input'), 'test@example.com');
    fireEvent.changeText(getByTestId('login-password-input'), 'password123');
    fireEvent.press(getByTestId('login-login-button'));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(setToken('fake-token'));
      expect(mockDispatch).toHaveBeenCalledWith(
        setProfile({email: 'test@example.com', name: 'John Doe'}),
      );
    });
  });
});
