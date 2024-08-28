import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import ProfileScreen from './ProfileScreen';
import {logout} from '@services/redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';

// Configuração do mock da store
const mockStore = configureStore();
const store = mockStore({
  auth: {
    profile: {
      name: 'John Doe', // Aqui estamos garantindo que 'John Doe' seja passado como userName
    },
  },
});

jest.mock('@react-native-async-storage/async-storage');
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    dispatch: jest.fn(),
  }),
}));
jest.mock('@services/redux/slices/authSlice', () => ({
  logout: jest.fn(),
}));
jest.mock('@services/redux/store', () => ({
  RootState: {} as any,
}));
jest.mock('@utils/Functions', () => ({
  toTitleCase: jest.fn().mockImplementation((text: string) => text),
}));
jest.mock('@utils/GlobalStyles', () => () => ({}));

describe('ProfileScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <ProfileScreen />
      </Provider>,
    );

    expect(getByTestId('profile-safearea')).toBeTruthy();
    expect(getByTestId('profile-header').children[0]).toContain('Perfil');
    expect(getByTestId('profile-username').children[0]).toContain('John Doe'); // Verifica se o texto "John Doe" está presente
    expect(getByTestId('profile-user-avatar')).toBeTruthy();
    expect(getByTestId('profile-goto-config')).toBeTruthy();
    expect(getByTestId('profile-logout')).toBeTruthy();
  });

  it('navigates to Config screen on config button press', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <ProfileScreen />
      </Provider>,
    );

    fireEvent.press(getByTestId('profile-goto-config'));

    const navigation = require('@react-navigation/native').useNavigation();
    expect(navigation.navigate).toHaveBeenCalledWith('Config');
  });
});
