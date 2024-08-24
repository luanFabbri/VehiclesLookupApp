import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import LanguagePicker from './LanguagePicker';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '@services/i18n/i18n';
import {loadSettings} from '@services/redux/slices/settingsSlice';

// Configura o mock do store do Redux
const mockStore = configureStore([]);

// Mock do AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

// Mock do i18n
jest.mock('@services/i18n/i18n', () => ({
  ...jest.requireActual('@services/i18n/i18n'),
  changeLanguage: jest.fn(),
}));

describe('LanguagePicker', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      settings: {language: 'en'},
    });

    // Reseta mocks antes de cada teste
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <LanguagePicker />
      </Provider>,
    );

    const picker = getByTestId('language-picker');
    expect(picker.props.selectedValue).toBe(i18n.language);
  });

  it('changes language and saves it in AsyncStorage, i18n and redux', async () => {
    const dispatch = jest.fn();
    store = mockStore({
      settings: {language: 'en'},
    });

    jest.spyOn(store, 'dispatch').mockImplementation(dispatch);

    // Mock do i18n.changeLanguage
    jest.spyOn(i18n, 'changeLanguage').mockImplementation(jest.fn());

    // Mock do AsyncStorage.setItem
    AsyncStorage.setItem = jest.fn();

    const {getByTestId} = render(
      <Provider store={store}>
        <LanguagePicker />
      </Provider>,
    );

    const picker = getByTestId('language-picker');

    fireEvent(picker, 'valueChange', 'es');

    await waitFor(() => {
      expect(i18n.changeLanguage).toHaveBeenCalledWith('es');
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('@language', 'es');
      expect(dispatch).toHaveBeenCalledWith(loadSettings({language: 'es'}));
    });
  });
});
