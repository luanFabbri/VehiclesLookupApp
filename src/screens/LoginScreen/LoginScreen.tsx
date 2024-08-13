import React, {useState} from 'react';
import {View, Text, SafeAreaView, Alert} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

// Importando módulos da aplicação usando aliases
import styles from './LoginScreen.styles';
import {login, getProfile} from '@api/api-config';
import {setProfile} from '@redux/slices/authSlice';
import {NavigationProps} from '@navigation/index';
import CustomInput from '@components/inputs/customInput/CustomInput'; // Atualize o caminho conforme a estrutura
import CustomButton from '@components/inputs/customButton/CustomButton'; // Atualize o caminho conforme a estrutura

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
        <CustomInput
          placeholder="E-mail"
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          onBlur={() => formik.handleBlur('email')}
          error={formik.touched.email ? formik.errors.email : undefined}
          keyboardType="email-address"
        />
        <CustomInput
          placeholder={t('password')}
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={() => formik.handleBlur('password')}
          error={formik.touched.password ? formik.errors.password : undefined}
          secureTextEntry
        />
        <CustomButton
          title="Login"
          onPress={formik.handleSubmit as any}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
