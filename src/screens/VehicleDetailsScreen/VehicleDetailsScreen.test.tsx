import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Alert} from 'react-native';
import VehicleDetailsScreen from './VehicleDetailsScreen';
import {fetchVehicleHistory} from '@api/api-config';

// Mocks
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock('@api/api-config', () => ({
  fetchVehicleHistory: jest.fn(),
}));

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

// Configuração do mock da store
const mockStore = configureStore([]);
const store = mockStore({
  settings: {darkMode: false}, // Estado inicial do Redux
  auth: {token: 'mocked-token'},
});

describe('VehicleDetailsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue({navigate: jest.fn()});
    (useRoute as jest.Mock).mockReturnValue({
      params: {vehicle: {id: 1, model: 'Test Vehicle'}},
    });
  });

  it('renders correctly', async () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <VehicleDetailsScreen />
      </Provider>,
    );
    await waitFor(() => {
      expect(getByTestId('vehicle-details-header')).toBeTruthy();
      expect(getByTestId('Vehicle-info')).toBeTruthy();
      expect(getByTestId('vehicle-details-history-header')).toBeTruthy();
      expect(getByTestId('vehicle-detail')).toBeTruthy();
    });
  });

  it('fetches and displays vehicle history on load', async () => {
    const mockHistory = [
      {
        timestamp: '2023-08-01T00:00:00Z',
        fuel: 'Gasoline',
        position: {latitude: 40.7128, longitude: -74.006},
      },
    ];
    (fetchVehicleHistory as jest.Mock).mockResolvedValueOnce(mockHistory);

    const {getByTestId} = render(
      <Provider store={store}>
        <VehicleDetailsScreen />
      </Provider>,
    );

    await waitFor(() => {
      expect(fetchVehicleHistory).toHaveBeenCalledWith('mocked-token');
      expect(getByTestId('vehicle-detail')).toBeTruthy();
    });
  });

  it('displays error alert and navigates to Login if token is missing', async () => {
    const storeWithoutToken = mockStore({
      settings: {darkMode: false},
      auth: {token: null},
    });
    const navigationMock = (useNavigation as jest.Mock).mockReturnValue({
      navigate: jest.fn(),
    });

    render(
      <Provider store={storeWithoutToken}>
        <VehicleDetailsScreen />
      </Provider>,
    );

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalled;
      expect(navigationMock().navigate).toHaveBeenCalledWith('Login');
    });
  });

  it('displays error alert if fetching history fails', async () => {
    (fetchVehicleHistory as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to fetch'),
    );

    render(
      <Provider store={store}>
        <VehicleDetailsScreen />
      </Provider>,
    );

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalled;
    });
  });
});
