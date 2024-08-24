import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import DarkModeToggle from './DarkModeToggle';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadSettings} from '@services/redux/slices/settingsSlice';

// Configura o mock do store do Redux
const mockStore = configureStore([]);

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('DarkModeToggle', () => {
  let store: any;
  const dispatch = jest.fn();

  beforeEach(() => {
    store = mockStore({
      settings: {darkMode: false},
    });

    // Reseta mocks antes de cada teste
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <DarkModeToggle />
      </Provider>,
    );
    expect(getByText('Dark Mode')).toBeTruthy();
  });

  it('loads dark mode setting from AsyncStorage', async () => {
    // Mock de AsyncStorage
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(true),
    );

    const {findByRole} = render(
      <Provider store={store}>
        <DarkModeToggle />
      </Provider>,
    );

    const switchComponent = await findByRole('switch');
    expect(switchComponent.props.value).toBe(true);
  });

  it('toggles dark mode setting and dispatches action', async () => {
    // Mock do dispatch
    jest.spyOn(store, 'dispatch').mockImplementation(dispatch);

    const {getByRole} = render(
      <Provider store={store}>
        <DarkModeToggle />
      </Provider>,
    );

    const switchComponent = getByRole('switch');

    // Simula a mudança no switch
    fireEvent(switchComponent, 'valueChange', true);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@darkMode',
        JSON.stringify(true),
      );
      expect(dispatch).toHaveBeenCalledWith(loadSettings({darkMode: true}));
    });
  });
});
