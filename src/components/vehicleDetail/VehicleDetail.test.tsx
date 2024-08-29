import React from 'react';
import {render} from '@testing-library/react-native';
import VehicleDetail from './VehicleDetail';
import {VehicleHistory} from '@interfaces/VehicleInterfaces';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

// Cria um mock do Redux store
const mockStore = configureStore([]);
const store = mockStore({
  settings: {darkMode: false}, // Estado inicial do Redux
});

describe('VehicleDetail', () => {
  const mockHistory: VehicleHistory[] = [
    {
      timestamp: '2023-08-23T12:34:56Z',
      fuelLevel: 75,
      latitude: -23.55052,
      longitude: -46.633308,
    },
    {
      timestamp: '2023-08-24T15:00:00Z',
      fuelLevel: 50,
      latitude: 40.712776,
      longitude: -74.005974,
    },
  ];

  it('renders the headers correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <VehicleDetail history={mockHistory} />
      </Provider>,
    );

    expect(getByText('Data/Hora')).toBeTruthy();
    expect(getByText('Combustível')).toBeTruthy();
    expect(getByText('Posição')).toBeTruthy();
  });

  it('renders the vehicle history items correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <VehicleDetail history={mockHistory} />
      </Provider>,
    );

    expect(getByText('23/08 09:34:56')).toBeTruthy();
    expect(getByText('75%')).toBeTruthy();
    expect(getByText('-23.55052,-46.633308')).toBeTruthy();

    expect(getByText('24/08 12:00:00')).toBeTruthy();
    expect(getByText('50%')).toBeTruthy();
    expect(getByText('40.712776,-74.005974')).toBeTruthy();
  });

  it('renders the MaterialCommunityIcons correctly', () => {
    const {getAllByTestId} = render(
      <Provider store={store}>
        <VehicleDetail history={mockHistory} />
      </Provider>,
    );

    const icons = getAllByTestId('location-icon');
    expect(icons.length).toBe(mockHistory.length);
  });
});
