import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import ProfileScreen from './ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuração do mock da store
const mockStore = configureStore();
const store = mockStore({
  auth: {
    profile: {
      name: 'John Doe', // Aqui estamos garantindo que 'John Doe' seja passado como userName
    },
  },
});

const mockNavigate = jest.fn();

jest.mock('@react-native-async-storage/async-storage');
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate, // Certifique-se de que navigate está definido
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
    const {getByTestId, getByText} = render(
      <Provider store={store}>
        <ProfileScreen />
      </Provider>,
    );

    expect(getByTestId('profile-safearea')).toBeTruthy();
    expect(getByTestId('profile-header')).toBeTruthy();
    expect(getByText('John Doe')).toBeTruthy(); // Verifica se "John Doe" é exibido
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

    expect(mockNavigate).toHaveBeenCalledWith('Config');
  });
});
