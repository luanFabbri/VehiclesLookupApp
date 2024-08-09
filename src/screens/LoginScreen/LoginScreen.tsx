// TODO - Adicionar visual na tela
// TODO - Componentizar botões e inputs

import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {CommonActions, useNavigation} from '@react-navigation/native';
import styles from './LoginScreen.styles';
import {login, getProfile} from '../../services/api-config';
import {setProfile} from '../../redux/slices/authSlice';
import {NavigationProps} from '../../navigation';
import {useTranslation} from 'react-i18next';

const LoginScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const {t} = useTranslation();

  const formik = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema: Yup.object({
      email: Yup.string().email('Email inválido').required('Campo obrigatório'),
      password: Yup.string().required('Campo obrigatório'),
    }),
    onSubmit: async values => {
      setLoading(true);
      const result = await login(values, dispatch);

      if (result?.status === 'success' && result.data) {
        console.log('Login bem-sucedido', result.data);
        const profileResult = await getProfile(result.data);

        if (profileResult.status === 'success' && profileResult.data) {
          console.log('Perfil do usuário', profileResult.data);
          dispatch(setProfile(profileResult.data));
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Home'}],
            }),
          );
        } else {
          Alert.alert('Erro', profileResult.message);
        }
      } else if (result?.status === 'error') {
        Alert.alert('Erro', result.message);
      }

      setLoading(false);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <Text style={styles.error}>{formik.errors.email}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder={t('password')}
          secureTextEntry
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <Text style={styles.error}>{formik.errors.password}</Text>
        ) : null}
        <Button onPress={formik.handleSubmit as any} title="Login" />
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
