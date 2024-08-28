import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import SplashScreen from './SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import {getProfile} from '@services/API/api-config';
import {loadSettings} from '@services/redux/slices/settingsSlice';
import {setProfile, setToken} from '@services/redux/slices/authSlice';

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

jest.mock('@react-native-async-storage/async-storage');
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    dispatch: jest.fn(),
  }),
  CommonActions: {
    reset: jest.fn(),
  },
}));
jest.mock('@services/API/api-config', () => ({
  getProfile: jest.fn(),
}));

describe('SplashScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <SplashScreen />
      </Provider>,
    );

    expect(getByTestId('splash-safearea')).toBeTruthy();
    expect(getByTestId('splash-image')).toBeTruthy();
  });

  //   it('loads app settings and navigates based on token presence', async () => {
  //     (AsyncStorage.getItem as jest.Mock)
  //       .mockResolvedValueOnce(JSON.stringify(false)) // Mock do darkMode
  //       .mockResolvedValueOnce('en') // Mock do language
  //       .mockResolvedValueOnce('valid-token'); // Mock do token

  //     const mockProfileData = {name: 'John Doe'};
  //     (getProfile as jest.Mock).mockResolvedValueOnce({
  //       status: 'success',
  //       data: mockProfileData,
  //     });

  //     render(
  //       <Provider store={store}>
  //         <SplashScreen />
  //       </Provider>,
  //     );

  //     expect(setToken).toHaveBeenCalledWith('valid-token');
  //     expect(getProfile).toHaveBeenCalledWith('valid-token');
  //     expect(setProfile).toHaveBeenCalledWith(mockProfileData);
  //     expect(CommonActions.reset).toHaveBeenCalledWith({
  //       index: 0,
  //       routes: [{name: 'Home'}],
  //     });
  //   });

  it('navigates to Login screen if no token is found', async () => {
    (AsyncStorage.getItem as jest.Mock)
      .mockResolvedValueOnce(JSON.stringify(false)) // Mock do darkMode
      .mockResolvedValueOnce('en') // Mock do language
      .mockResolvedValueOnce(''); // Mock do token ausente

    render(
      <Provider store={store}>
        <SplashScreen />
      </Provider>,
    );

    await waitFor(() => {
      expect(CommonActions.reset).toHaveBeenCalledWith({
        index: 0,
        routes: [{name: 'Login'}],
      });
    });
  });
});
