import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import AboutScreen from '@screens/AboutScreen/AboutScreen';
import {useTranslation} from 'react-i18next';
import useGlobalStyles from '@utils/GlobalStyles';
import * as Linking from 'react-native/Libraries/Linking/Linking';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

// Cria um mock do Redux store
const mockStore = configureStore([]);
const store = mockStore({
  settings: {darkMode: false}, // Estado inicial do Redux
});

// Mock dos hooks e funções
jest.mock('react-i18next');
jest.mock('@utils/GlobalStyles.ts');

describe('AboutScreen', () => {
  const mockT = jest.fn(key => key);
  const mockGlobalStyles = {
    container: {flex: 1, padding: 20},
  };

  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({t: mockT});
    (useGlobalStyles as jest.Mock).mockReturnValue(mockGlobalStyles);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders AboutScreen correctly', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <AboutScreen />
      </Provider>,
    );

    // Verifica se o ScrollView é renderizado
    expect(getByTestId('about-scrollview')).toBeTruthy();

    // Verifica o nome do aplicativo
    expect(getByTestId('about-appname').children[0]).toBe('VehicleLookupApp');

    // Verifica se os textos traduzidos estão presentes
    expect(getByTestId('about-desc-1')).toBeTruthy();
    expect(getByTestId('about-thanks')).toBeTruthy();
    expect(getByTestId('about-desc-2')).toBeTruthy();
  });

  it('opens LinkedIn link when clicked', () => {
    const spyOpenURL = jest
      .spyOn(Linking as any, 'openURL')
      .mockImplementation(jest.fn());

    const {getByText} = render(
      <Provider store={store}>
        <AboutScreen />
      </Provider>,
    );

    const linkedInLink = getByText('LinkedIn');

    // Simula o clique no link do LinkedIn
    fireEvent.press(linkedInLink);

    // Verifica se o link do LinkedIn foi aberto
    expect(spyOpenURL).toHaveBeenCalledWith(
      'https://www.linkedin.com/in/lpffabbri/',
    );
  });
});
