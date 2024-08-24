import React from 'react';
import {render} from '@testing-library/react-native';
import VehicleInfo from '../vehicleInfo/VehicleInfo';
import {Vehicle} from '@interfaces/VehicleInterfaces';
import useGlobalStyles from '@utils/GlobalStyles.ts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

// Cria um mock do Redux store
const mockStore = configureStore([]);
const store = mockStore({
  settings: {darkMode: false}, // Estado inicial do Redux
});

// Mock do hook useGlobalStyles
jest.mock('@utils/GlobalStyles.ts');
jest.mock(
  'react-native-vector-icons/MaterialCommunityIcons',
  () => 'MaterialCommunityIcons',
);

describe('VehicleInfo', () => {
  const mockVehicle: Vehicle = {
    model: 'Toyota Corolla',
    odometerKm: 15000,
    chassis: 'XYZ1234ABC',
    licensePlate: 'ABC-1234',
    fuelLevel: 80,
    pictureLink: 'assets/images/logo.png',
    latitude: 40.712776,
    longitude: -74.005974,
  };

  const mockGlobalStyles = {
    commonTextMedium: {color: 'black'},
  };

  beforeEach(() => {
    (useGlobalStyles as jest.Mock).mockReturnValue(mockGlobalStyles);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the vehicle information correctly', () => {
    const {getByText, getByTestId} = render(
      <Provider store={store}>
        <VehicleInfo vehicle={mockVehicle} />
      </Provider>,
    );

    expect(getByText('Toyota Corolla')).toBeTruthy();
    expect(getByText('15000 km')).toBeTruthy();
    expect(getByText('XYZ1234ABC • ABC-1234')).toBeTruthy();
    expect(getByText('80%')).toBeTruthy();
    const image = getByTestId('vehicle-image');
    expect(image.props.source.uri).toBe(mockVehicle.pictureLink);
  });

  it('renders the MaterialCommunityIcons correctly', () => {
    const {getAllByTestId} = render(
      <Provider store={store}>
        <VehicleInfo vehicle={mockVehicle} />
      </Provider>,
    );

    const odometerIcon = getAllByTestId('counter-icon');
    expect(odometerIcon.length).toBe(1);

    const fuelIcon = getAllByTestId('fuel-icon');
    expect(fuelIcon.length).toBe(1);
  });
});
