import React from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {CommonActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importando módulos da aplicação usando aliases
import {RootState} from '@services/redux/store';
import UserAvatar from '@components/userAvatar/UserAvatar';
import {toTitleCase} from '@utils/Functions';
import VText from '@components/vtext/VText';
import {logout} from '@services/redux/slices/authSlice';

// Estilos
import styles from './ProfileScreen.styles';
import useGlobalStyles from '@utils/GlobalStyles';
import CustomButton from '@components/inputs/customButton/CustomButton';
import {NavigationProps} from '@navigation/index';

const ProfileScreen: React.FC = () => {
  const globalStyles = useGlobalStyles();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const userName = useSelector((state: RootState) => state.auth.profile?.name);

  const handleConfigPress = () => {
    navigation.navigate('Config');
  };

  const handleLogoutPress = async () => {
    await AsyncStorage.removeItem('@token'); // Limpa o token do AsyncStorage
    dispatch(logout()); // Limpa os dados de auth no Redux

    // Reseta a navegação e vai para a tela de Login
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}],
      }),
    );
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <VText style={styles.title}>{t('profile')}</VText>
      <View style={styles.profileData}>
        <VText style={styles.userName}>{toTitleCase(userName || '')}</VText>
        <UserAvatar
          uri={`https://ui-avatars.com/api/?name=${userName}&background=random`}
          size="big"
        />
      </View>
      <View style={styles.profileOptionsView}>
        <View>
          <CustomButton
            title="Configurações"
            onPress={handleConfigPress}
            style={styles.pofileButton}
            textStyle={styles.profileButtonText}
          />
        </View>
        <View>
          <CustomButton
            title="Sair"
            onPress={handleLogoutPress}
            style={styles.pofileButton}
            textStyle={styles.profileButtonText}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
