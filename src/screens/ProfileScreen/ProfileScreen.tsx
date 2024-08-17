import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

// Importando módulos da aplicação usando aliases
import {RootState} from '@services/redux/store';
import styles from './ProfileScreen.styles';
import UserAvatar from '@components/userAvatar/UserAvatar';
import LanguagePicker from '@components/inputs/picker/LanguagePicker';
import {toTitleCase} from '@utils/toTitleCase';

const ProfileScreen: React.FC = () => {
  const {t} = useTranslation();
  const userName = useSelector((state: RootState) => state.auth.profile?.name);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('profile')}</Text>
      <View style={styles.profileData}>
        <Text style={styles.userName}>{toTitleCase(userName || '')}</Text>
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
