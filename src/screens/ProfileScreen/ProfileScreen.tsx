// src/screens/ProfileScreen.tsx
import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {Picker} from '@react-native-picker/picker';
import {useTranslation} from 'react-i18next';
import i18n from '../../i18n';
import styles from './ProfileScreen.styles';

const App = () => {
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
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${userName}&background=random`,
          }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.languagePicker}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={itemValue => handleLanguageChange(itemValue)}>
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Español" value="es" />
          <Picker.Item label="Português" value="pt" />
        </Picker>
      </View>
    </View>
  );
};

export default App;
