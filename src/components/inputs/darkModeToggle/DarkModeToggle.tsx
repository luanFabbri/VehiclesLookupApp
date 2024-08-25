import React, { useEffect, useState } from 'react';
import { Alert, Switch, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch } from 'react-redux';
import { loadSettings } from '@services/redux/slices/settingsSlice';
import { useTranslation } from 'react-i18next';

// Estilos
import styles from './DarkModeToggle.styles';
import VText from '@components/vtext/VText';

const DarkModeToggle: React.FC = ({ }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedDarkMode = await AsyncStorage.getItem('@darkMode');

        if (storedDarkMode !== null && storedDarkMode !== undefined) {
          setIsDarkMode(JSON.parse(storedDarkMode));
        }
      } catch (error) {
        Alert.alert(t("darkmodetoggle-error-load"));
        console.error('Failed to load settings', error);
      }
    };

    loadSettings();
  }, []);

  const toggleDarkMode = async () => {
    try {
      const darkMode = !isDarkMode;
      setIsDarkMode(darkMode);
      await AsyncStorage.setItem('@darkMode', JSON.stringify(darkMode));
      dispatch(loadSettings({ darkMode }));
    } catch (error) {
      Alert.alert(t("darkmodetoggle-error-save"));
      console.error('Failed to save dark mode setting', error);
    }
  };

  return (
    <View style={styles.row}>
      <VText>{t("darkmodetoggle-label")}</VText>
      <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
    </View>
  );
};

export default DarkModeToggle;
