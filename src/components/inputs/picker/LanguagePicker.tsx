import React, {useState} from 'react';
import {Alert, View} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {loadSettings} from '@services/redux/slices/settingsSlice';
import i18n from '@services/i18n/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

// estilos
import styles from './LanguagePicker.styles';

const LanguagePicker: React.FC = ({}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const handleLanguageChange = async (language: string) => {
    try {
      setSelectedLanguage(language);
      i18n.changeLanguage(language);
      dispatch(loadSettings({language}));
      await AsyncStorage.setItem('@language', language);
    } catch (e) {
      console.log('error: ', e);
      Alert.alert(t('languagepicker-error-save'));
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        testID="language-picker"
        style={styles.pickerMain}
        selectedValue={selectedLanguage}
        onValueChange={itemValue => handleLanguageChange(itemValue)}>
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Español" value="es" />
        <Picker.Item label="Português" value="pt" />
      </Picker>
    </View>
  );
};

export default LanguagePicker;
