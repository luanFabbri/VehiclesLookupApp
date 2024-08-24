import React, {useEffect, useState} from 'react';
import {Switch, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useDispatch} from 'react-redux';
import {loadSettings} from '@services/redux/slices/settingsSlice';

// Estilos
import styles from './DarkModeToggle.styles';
import VText from '@components/vtext/VText';

const DarkModeToggle: React.FC = ({}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedDarkMode = await AsyncStorage.getItem('@darkMode');

        if (storedDarkMode !== null && storedDarkMode !== undefined) {
          setIsDarkMode(JSON.parse(storedDarkMode));
        }
      } catch (error) {
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
      dispatch(loadSettings({darkMode}));
    } catch (error) {
      console.error('Failed to save dark mode setting', error);
    }
  };

  return (
    <View style={styles.row}>
      <VText>Dark Mode</VText>
      <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
    </View>
  );
};

export default DarkModeToggle;
