// App.tsx
import React from 'react';
import AppNavigator from './src/navigation';
import './src/i18n';
import 'intl-pluralrules';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/i18n';
import {Provider} from 'react-redux';
import store from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AppNavigator />
      </I18nextProvider>
    </Provider>
  );
};

export default App;
