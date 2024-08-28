import React, {useState} from 'react';
import {View, SafeAreaView, Alert, TouchableOpacity} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importando módulos da aplicação
import {login, getProfile} from '@api/api-config';
import {setProfile, setToken} from '@services/redux/slices/authSlice';
import {NavigationProps} from '@navigation/index';
import CustomInput from '@components/inputs/customInput/CustomInput';
import CustomButton from '@components/inputs/customButton/CustomButton';
import VText from '@components/vtext/VText';
import {TOKEN} from '@env';

// Estilos
import styles from './LoginScreen.styles';
import useGlobalStyles from '@utils/GlobalStyles';

const LoginScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const {t} = useTranslation();
  const GlobalStyles = useGlobalStyles();

  const handleForceLogin = async () => {
    await AsyncStorage.setItem('@token', TOKEN);
    dispatch(setToken(TOKEN));
    const profileResult = await getProfile(TOKEN);

    if (profileResult.status === 'success' && profileResult.data) {
      dispatch(setProfile(profileResult.data));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      );
    } else {
      Alert.alert(t('error'), profileResult.message || t('unknownError'));
    }
  };

  const formik = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema: Yup.object({
      email: Yup.string().email(t('invalidEmail')).required(t('requiredField')),
      password: Yup.string().required(t('requiredField')),
    }),
    onSubmit: async values => {
      setLoading(true);
      const result = await login(values, dispatch);

      if (result?.status === 'success' && result.data) {
        await AsyncStorage.setItem('@token', result.data);
        const profileResult = await getProfile(result.data);

        if (profileResult.status === 'success' && profileResult.data) {
          dispatch(setProfile(profileResult.data));
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Home'}],
            }),
          );
        } else {
          Alert.alert(t('error'), profileResult.message || t('unknownError'));
        }
      } else if (result?.status === 'error') {
        Alert.alert(t('error'), result.message || t('unknownError'));
      }

      setLoading(false);
    },
  });

  return (
    <SafeAreaView
      style={[GlobalStyles.container, styles.container]}
      testID="login-safearea">
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Config')}
        testID="login-cog-pressable">
        <MaterialCommunityIcons
          name="cog"
          size={24}
          testID="login-cog-icon"
          color={GlobalStyles.commonTextMedium.color}
        />
      </TouchableOpacity>

      <View style={styles.innerContainer}>
        <View style={{position: 'relative'}}>
          <VText style={styles.appName} customTestID="login-appname">
            Vehicle Lookup App
          </VText>
          <VText size="small" style={styles.appSubtitle}>
            {t('createdBy')}
          </VText>
        </View>

        <CustomInput
          placeholder={t('email')}
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          onBlur={() => formik.handleBlur('email')}
          customTestID="login-email-input"
          error={formik.touched.email ? formik.errors.email : undefined}
          keyboardType="email-address"
        />
        <CustomInput
          placeholder={t('password')}
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={() => formik.handleBlur('password')}
          customTestID="login-password-input"
          error={formik.touched.password ? formik.errors.password : undefined}
          secureTextEntry
        />
        <CustomButton
          title={t('login')}
          onPress={formik.handleSubmit as any}
          loading={loading}
          customStyle={styles.loginButton}
          textStyle={styles.loginButtonText}
          customTestID="login-login-button"
        />
        <CustomButton
          title={t('forceLogin')}
          onPress={handleForceLogin}
          loading={loading}
          customStyle={styles.loginButton}
          textStyle={styles.loginButtonText}
          customTestID="login-forceLogin-button"
        />
      </View>

      <CustomButton
        title={t('aboutThisApp')}
        onPress={() => navigation.navigate('About')}
        customStyle={styles.aboutButton}
        textStyle={GlobalStyles.aboutButtonText}
        customTestID="login-about-button"
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
