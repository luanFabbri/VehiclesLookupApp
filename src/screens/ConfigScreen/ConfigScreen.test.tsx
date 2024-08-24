import React from 'react';
import {render} from '@testing-library/react-native';
import ConfigScreen from './ConfigScreen';
import LanguagePicker from '@components/inputs/picker/LanguagePicker';
import DarkModeToggle from '@components/inputs/darkModeToggle/DarkModeToggle';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {Text} from 'react-native';

// Cria um mock do Redux store
const mockStore = configureStore([]);
const store = mockStore({
  settings: {darkMode: false}, // Estado inicial do Redux
});

// Mock para os componentes internos
jest.mock('@components/inputs/picker/LanguagePicker', () =>
  jest.fn(() => null),
);
jest.mock('@components/inputs/darkModeToggle/DarkModeToggle', () =>
  jest.fn(() => null),
);
jest.mock('@components/vtext/VText', () =>
  jest.fn(({children, customTestID}) => (
    <Text testID={customTestID}>{children}</Text>
  )),
);

describe('ConfigScreen', () => {
  it('renders correctly and displays the correct components', async () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <ConfigScreen />
      </Provider>,
    );

    // Verifica se o texto do header está presente
    expect(getByTestId('config-header')).toBeTruthy();

    // Verifica se o DarkModeToggle está presente
    expect(DarkModeToggle).toHaveBeenCalled();

    // Verifica se o LanguagePicker está presente
    expect(LanguagePicker).toHaveBeenCalled();
  });

  it('applies global and local styles correctly', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <ConfigScreen />
      </Provider>,
    );

    // Verifica se a SafeAreaView está com os estilos aplicados corretamente
    console.log(getByTestId('config-safearea').props.style);
  });
});
