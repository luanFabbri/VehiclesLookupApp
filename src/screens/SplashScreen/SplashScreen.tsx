import React, {useEffect} from 'react';
import {View, SafeAreaView, Image, Alert} from 'react-native';

// Estilos
import styles from './SplashScreen.styles';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '@services/i18n/i18n';
import {loadSettings} from '@services/redux/slices/settingsSlice';
import {setProfile, setToken} from '@services/redux/slices/authSlice';
import {getProfile} from '@services/API/api-config';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {NavigationProps} from '@navigation/index';

const SplashScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    const loadAppSettings = async () => {
      const darkMode = JSON.parse(
        (await AsyncStorage.getItem('@darkMode')) || 'false',
      );
      const language =
        (await AsyncStorage.getItem('@language')) || i18n.language;

      const token = (await AsyncStorage.getItem('@token')) || '';

      dispatch(loadSettings({darkMode, language}));
      dispatch(setToken(token));

      i18n.changeLanguage(language);

      if (token) {
        const profileResult = await getProfile(token);
        if (profileResult.status === 'success' && profileResult.data) {
          dispatch(setProfile(profileResult.data));
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Home'}],
            }),
          );
        } else {
          Alert.alert(
            i18n.t('error'),
            profileResult.message || i18n.t('unknownError'),
          );
        }
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Login'}],
          }),
        );
      }
    };

    loadAppSettings();
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
