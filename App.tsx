import React from 'react';
import {Provider} from 'react-redux';
import {I18nextProvider} from 'react-i18next';

import AppNavigator from './src/navigation';
import i18n from './src/services/i18n/i18n';
import store from './src/services/redux/store';
import './src/services/i18n/i18n';

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
