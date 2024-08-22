import React, {useEffect} from 'react';
import {Provider, useDispatch} from 'react-redux';
import {I18nextProvider} from 'react-i18next';

import AppNavigator from './src/navigation';
import i18n from './src/services/i18n/i18n';
import store from './src/services/redux/store';
import {loadSettings} from './src/services/redux/slices/settingsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import './src/services/i18n/i18n';

const AppInitializer: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadAppSettings = async () => {
      const darkMode = JSON.parse(
        (await AsyncStorage.getItem('@darkMode')) || 'false',
      );
      const language =
        (await AsyncStorage.getItem('@language')) || i18n.language;

      dispatch(loadSettings({darkMode, language}));

      i18n.changeLanguage(language);
    };

    loadAppSettings();
  }, [dispatch]);

  return <AppNavigator />;
};

const App = () => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AppInitializer />
      </I18nextProvider>
    </Provider>
  );
};

export default App;
