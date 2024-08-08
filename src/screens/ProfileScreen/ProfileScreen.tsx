import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {useTranslation} from 'react-i18next';
import i18n from '../../i18n';
import styles from './ProfileScreen.styles';
import UserAvatar from '../../components/userAvatar/UserAvatar';
import LanguagePicker from '../../components/buttons/picker/LanguagePicker';

const ProfileScreen: React.FC = () => {
  const {t} = useTranslation();
  const userName = useSelector((state: RootState) => state.auth.profile?.name);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const toTitleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('profile')}</Text>
      <View style={styles.profileSection}>
        <Text style={styles.userName}>{toTitleCase(userName || '')}</Text>
        <UserAvatar
          uri={`https://ui-avatars.com/api/?name=${userName}&background=random`}
          size="big"
        />
      </View>
      <View style={styles.languagePicker}>
        <LanguagePicker
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
