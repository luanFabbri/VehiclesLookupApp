import React from 'react';
import {render, waitFor, act, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import HomeScreen from './HomeScreen';
import {fetchVehicles} from '@api/api-config';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';

// Mock do Redux store
const mockStore = configureStore([]);
const store = mockStore({
  auth: {
    token: 'dummy-token',
    profile: {
      name: 'John Doe',
    },
  },
});

// Mock das funções e módulos
jest.mock('@api/api-config', () => ({
  fetchVehicles: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('@components/userAvatar/UserAvatar', () =>
  jest.fn(() => <View testID="home-user-avatar" />),
);

jest.mock('@components/map/customMapView/CustomMapView', () =>
  jest.fn(() => <View testID="home-mapview" />),
);

describe('HomeScreen', () => {
  beforeEach(() => {
    (fetchVehicles as jest.Mock).mockResolvedValue([
      {
        id: '1',
        latitude: 37.78825,
        longitude: -122.4324,
        // outros campos necessários
      },
    ]);
  });

  it('renders correctly and displays the correct components', async () => {
    const navigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({navigate});

    const {getByTestId, queryByTestId, findByTestId} = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>,
    );

    // Verifica se o SafeAreaView está presente
    expect(getByTestId('home-safearea')).toBeTruthy();

    // Verifica se o logo está presente
    expect(getByTestId('home-logo')).toBeTruthy();

    // Verifica se o avatar do usuário está presente
    expect(await findByTestId('home-user-avatar')).toBeTruthy();

    // Espera a chamada da API e verifica se o CustomMapView foi renderizado
    await waitFor(() => {
      expect(queryByTestId('home-mapview')).toBeTruthy();
    });
  });

  it('navigates to Profile screen when the avatar is pressed', async () => {
    const navigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({navigate});

    const {getByTestId} = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>,
    );

    fireEvent.press(getByTestId('home-pressable'));

    // Verifica se a navegação foi chamada com o destino correto
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('Profile');
    });
  });

  it('navigates to Login screen if token is missing', () => {
    const navigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({navigate});

    const emptyStore = mockStore({
      auth: {
        token: null,
        profile: {
          name: 'John Doe',
        },
      },
    });

    render(
      <Provider store={emptyStore}>
        <HomeScreen />
      </Provider>,
    );

    // Verifica se a navegação para a tela de login foi chamada
    expect(navigate).toHaveBeenCalledWith('Login');
  });
});
