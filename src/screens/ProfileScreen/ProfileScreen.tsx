import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

// Importando módulos da aplicação usando aliases
import {RootState} from '@services/redux/store';
import UserAvatar from '@components/userAvatar/UserAvatar';
import LanguagePicker from '@components/inputs/picker/LanguagePicker';
import {toTitleCase} from '@utils/Functions';
import VText from '@components/vtext/VText';

// Estilos
import styles from './ProfileScreen.styles';
import globalStyles from '@utils/GlobalStyles';

const ProfileScreen: React.FC = () => {
  const {t} = useTranslation();
  const userName = useSelector((state: RootState) => state.auth.profile?.name);

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
      <View style={styles.languagePicker}>
        <LanguagePicker />
      </View>
    </View>
  );
};

export default ProfileScreen;
